'use client'

// Framework
import { useCallback, useState } from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { encodeFunctionData, parseEther } from 'viem'

// Forms
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Components
import { SingleIPFSMediaUpload } from '@/components/ipfs'
import RenderImage from '@/modules/create-activity/components/nft/RenderImage'
import {
  InputSlider,
  TextArea,
  TextInput,
  // InputSlider
} from '@/components/forms'
import { Button } from '@/components/shared'
import { EditionTypeRadio } from './EditionTypeRadio'
import { CoverUrlInput } from './CoverUrlInput'

// Chain
import { useDaoStore } from '@/modules/dao'
import { PUBLIC_ZORA_NFT_CREATOR } from '@/constants/addresses'

// Schema
import schema, {
  type CreateNFTFormValues,
  type EditionType,
} from './CreateNFT.schema'
import { InputENSAddress } from '@/components/ipfs'
import { AnimatePresence } from 'framer-motion'
import { DateInput } from '@/components/forms/DateInput'
import dayjs from 'dayjs'
import { TransactionType } from '@/modules/create-activity/types'
import { AddressType } from '@/types'
import { useProposalStore } from '@/modules/create-activity/stores'
import { useChainStore } from '@/utils/stores/useChainStore'
import { zoraNFTCreatorAbi } from '@/data/contract/abis/ZoraNFTCreator'

const UINT_64_MAX = BigInt('18446744073709551615')
const UINT_32_MAX = BigInt('4294967295')
const HASH_ZERO =
  '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`

type CreateNFTFormProps = {
  callback: () => void
}

export function CreateNFT({ callback }: CreateNFTFormProps): JSX.Element {
  const [editionType, setEditionType] = useState<EditionType>('fixed')
  const { address: user } = useAccount()
  const { treasury } = useDaoStore((x) => x.addresses)
  const initialValues: CreateNFTFormValues = {
    name: '',
    symbol: '',
    description: '',
    duration: 7,
    mediaUrl: '',
    mediaType: '',
    coverUrl: '',
    fundsRecipient: treasury || '',
    defaultAdmin: user || '',
    publicSaleStart: '',
    royaltyPercentage: 5,
    pricePerMint: 0,
    maxSupply: 10,
  }
  const methods = useForm<CreateNFTFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema) as any,
  })
  const { control, formState, handleSubmit, setValue, watch, getValues } =
    methods

  const handleEditionTypeChanged = useCallback(
    (value: EditionType) => {
      setValue('maxSupply', value === 'open' ? 0 : undefined)
      setEditionType(value)
    },
    [setEditionType, setValue]
  )

  const addTransaction = useProposalStore((state) => state.addTransaction)
  const chain = useChainStore((x) => x.chain)

  const onSubmit = (values: CreateNFTFormValues) => {
    if (!chain) return
    const {
      name,
      symbol,
      maxSupply,
      royaltyPercentage,
      fundsRecipient,
      defaultAdmin,
      pricePerMint: publicSalePrice,
      maxPerAddress: maxSalePurchasePerAddress,
      publicSaleStart,
      duration,
      description,
      mediaUrl,
      mediaType,
      coverUrl,
    } = values
    const publicSaleEnd = dayjs(new Date(publicSaleStart))
      .add(duration, 'days')
      .format('YYYY-MM-DD')

    const royaltyBPS = royaltyPercentage * 100
    const salesConfig = {
      publicSalePrice: parseEther((publicSalePrice || 0).toString()),
      maxSalePurchasePerAddress: maxSalePurchasePerAddress
        ? maxSalePurchasePerAddress
        : Number(UINT_32_MAX),
      publicSaleStart: BigInt(
        Math.floor(new Date(publicSaleStart).getTime() / 1000)
      ),
      publicSaleEnd: BigInt(
        Math.floor(new Date(publicSaleEnd).getTime() / 1000)
      ),
      presaleStart: BigInt(0), // presaleStart
      presaleEnd: BigInt(0), // presaleEnd
      presaleMerkleRoot: HASH_ZERO, // presaleMerkleRoot
    }
    const animationUri = mediaType?.startsWith('image') ? '' : mediaUrl
    const imageUri = mediaType?.startsWith('image') ? mediaUrl : coverUrl

    const editionSize =
      maxSupply && maxSupply > 0 ? BigInt(maxSupply) : UINT_64_MAX

    const createEdition = {
      target: PUBLIC_ZORA_NFT_CREATOR[chain.id] as AddressType,
      functionSignature: 'createEdition()',
      calldata: encodeFunctionData({
        abi: zoraNFTCreatorAbi,
        functionName: 'createEdition',
        args: [
          name,
          symbol,
          editionSize,
          royaltyBPS,
          fundsRecipient as AddressType,
          defaultAdmin as AddressType,
          salesConfig,
          description,
          animationUri,
          imageUri,
        ],
      }),
      value: '',
    }

    addTransaction({
      type: TransactionType.NFT,
      summary: 'Create an NFT/Merch release',
      transactions: [createEdition],
    })
    callback?.()
  }

  return (
    <FormProvider {...methods}>
      <form
        id="__create_nft"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[668px]"
      >
        <div className="grid grid-cols-2 gap-4">
          <EditionTypeRadio
            editionType={editionType}
            onChange={handleEditionTypeChanged}
          />
          <div className="col-span-2">
            <Controller
              control={control}
              name="mediaUrl"
              render={({ field }) => (
                <SingleIPFSMediaUpload
                  label="Media url"
                  mediaTypeCallback={(mediaType: string) =>
                    setValue('mediaType', mediaType)
                  }
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          {watch('imageBlob') && (
            <div className="col-span-2 flex flex-col items-center justify-center   rounded-xl bg-white p-4">
              <span className="mb-2 block w-full text-left font-abcMedium text-sm">
                Media Preview
              </span>
              <RenderImage image={getValues('imageBlob')} />
            </div>
          )}
          <AnimatePresence>
            <CoverUrlInput />
          </AnimatePresence>
          <TextInput
            name="name"
            className="col-span-2"
            label="Title"
            placeholder="NFT's title"
            type="text"
          />
          <TextArea
            name="description"
            className="col-span-2"
            label="Description"
            placeholder="NFT's description"
            type="text"
          />
          <TextInput
            name="symbol"
            className="col-span-2"
            label="Symbol"
            placeholder="$Symbol"
            type="text"
          />
          <DateInput name="publicSaleStart" label="Sale start date" />
          <div className="col-span-2">
            <Controller
              control={control}
              name="duration"
              render={({ field }) => (
                <InputSlider
                  value={field.value}
                  label="Duration"
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <TextInput name="maxSupply" label="No. of editions" type="number" />
          <TextInput
            name="pricePerMint"
            label="Price per edition"
            placeholder="NFT's price"
            type="text"
          />
          <TextInput
            name="maxPerAddress"
            label="Limit per address"
            defaultValue={1}
            type="text"
          />
          <TextInput name="royaltyPercentage" label="Royalty" type="number" />
          <Controller
            control={control}
            name="fundsRecipient"
            defaultValue={initialValues.fundsRecipient}
            render={({ field }) => (
              <InputENSAddress
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                className="col-span-2"
                label="Payout address"
                placeholder="payout address"
              />
            )}
          />
          <Controller
            control={control}
            name="defaultAdmin"
            render={({ field }) => (
              <InputENSAddress
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                className="col-span-2"
                label="Admin address"
                placeholder="admin address"
              />
            )}
          />
        </div>
        <Button
          className="float-right mt-4"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Add Action
        </Button>
      </form>
    </FormProvider>
  )
}
