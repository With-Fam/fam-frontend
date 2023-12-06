'use client'

// Framework
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Third Parties
import { Listbox } from '@headlessui/react'
import { useFormContext } from 'react-hook-form'

// Components

// Types

// Content
import CURRENCIES_DATA from '@/content/create-activity/currencies'

/*--------------------------------------------------------------------*/

/**
 * Form
 */

export function CurrencyList(): JSX.Element {
  const { setValue } = useFormContext()
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES_DATA[0])

  useEffect(() => {
    setValue('currency', selectedCurrency.name)
  }, [])

  const handleSelection = (value: string) => {
    const selectedCurrencyData = CURRENCIES_DATA[Number(value) - 1]
    setValue('currency', selectedCurrency.name)
    setSelectedCurrency(selectedCurrencyData)
  }

  return (
    <div className="absolute bottom-4 right-4">
      <Listbox value="bruno" onChange={handleSelection}>
        <Listbox.Button className="flex items-center rounded-full bg-background p-1">
          <span>
            <Image
              src={selectedCurrency.image}
              alt=""
              width={32}
              height={32}
              className="object-cover object-center"
            />
          </span>
          <span className="ml-1.5">{selectedCurrency.name}</span>
          <span>
            <Image
              src="/assets/icons/arrow-down.svg"
              alt=""
              width={12}
              height={6}
              className="ml-3 mr-2 object-contain"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute left-0 top-1/2 rounded-lg bg-white px-4 py-2 shadow-md ">
          {CURRENCIES_DATA.map((currency, index) => (
            <Listbox.Option
              key={index}
              value={currency.id}
              className="mb-2 flex cursor-pointer items-center justify-between gap-1.5 rounded-lg hover:bg-background"
            >
              {({ active }) => (
                <>
                  <span className="w-8">
                    <Image
                      src={currency.image}
                      alt=""
                      width={32}
                      height={32}
                      className="object-cover object-center"
                    />
                  </span>
                  <span
                    className={`w-12 ${
                      active || selectedCurrency.id === currency.id
                        ? 'text-orange'
                        : ''
                    }`}
                  >
                    {currency.name}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
