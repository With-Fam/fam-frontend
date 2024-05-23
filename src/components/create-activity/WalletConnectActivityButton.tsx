import { Button } from '@/components/shared'
import { Core } from '@walletconnect/core'
import { Web3Wallet, Web3WalletTypes } from '@walletconnect/web3wallet'
import AuthClient from '@walletconnect/auth-client'
import { useEffect, useState } from 'react'
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils'
import { hexToString } from 'viem'

const WalletConnectActivityButton = () => {
  const [web3Wallet, setWeb3Wallet] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      const core = new Core({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      })

      const response = await Web3Wallet.init({
        core, // <- pass the shared `core` instance
        metadata: {
          name: 'Demo app',
          description: 'Demo Client as Wallet/Peer',
          url: 'www.walletconnect.com',
          icons: [],
        },
      })
      response.on('session_request', async (event) => {
        console.log('SWEETS session_request', event)

        const { topic, params, id } = event
        const { request } = params
        const requestParamsMessage = request.params[0]
        console.log('SWEETS requestParamsMessage', requestParamsMessage)

        // // convert `requestParamsMessage` by using a method like hexToUtf8
        const message = hexToString(requestParamsMessage)
        console.log('SWEETS message', message)

        // // sign the message
        // const signedMessage = await wallet.signMessage(message)

        // const response = { id, result: signedMessage, jsonrpc: '2.0' }

        // await web3wallet.respondSessionRequest({ topic, response })
      })

      response.on('session_proposal', async (proposal) => {
        console.log('SWEETS session_proposal', proposal)
        const session = await response.approveSession({
          id: proposal.id,
          namespaces: {
            eip155: {
              chains: ['eip155:1', 'eip155:137'],
              methods: [
                'eth_accounts',
                'eth_requestAccounts',
                'eth_sendRawTransaction',
                'eth_sign',
                'eth_signTransaction',
                'eth_signTypedData',
                'eth_signTypedData_v3',
                'eth_signTypedData_v4',
                'eth_sendTransaction',
                'personal_sign',
                'wallet_switchEthereumChain',
                'wallet_addEthereumChain',
                'wallet_getPermissions',
                'wallet_requestPermissions',
                'wallet_registerOnboarding',
                'wallet_watchAsset',
                'wallet_scanQRCode',
                'wallet_sendCalls',
                'wallet_getCallsStatus',
                'wallet_showCallsStatus',
                'wallet_getCapabilities',
              ],
              events: [
                'chainChanged',
                'accountsChanged',
                'message',
                'disconnect',
                'connect',
              ],
              accounts: [
                'eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb',
                'eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb',
              ],
            },
          },
        })
        console.log('SWEETS session', session)
      })
      setWeb3Wallet(response)

      const authClient = await AuthClient.init({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        metadata: {
          name: 'my-auth-dapp',
          description: 'A dapp using WalletConnect AuthClient',
          url: 'my-auth-dapp.com',
          icons: ['https://my-auth-dapp.com/icons/logo.png'],
        },
      })
      console.log('SWEETS authClient', authClient)
    }

    init()
  }, [])

  const handleClick = async () => {
    console.log('SWEETS START WALLET CONNECT SESSION', web3Wallet)
    const uri =
      'wc:4524941fdd3ce7847e5a95631085d346e51c82a668a881ad908d1f3463c7e45f@2?expiryTimestamp=1715901585&relay-protocol=irn&symKey=fc3b9ffaff7cc28e3a2b5139d2e18675aaf82e5547854fc4f9a64ee8cdf14262'
    try {
      const response = await web3Wallet.pair({ uri })
      console.log('SWEETS PAIR REQUEST', response)
    } catch (error) {
      console.error('SWEETS error', error)
      // some error happens while pairing - check Expected errors section
    }
  }

  async function onSessionProposal({
    id,
    params,
  }: Web3WalletTypes.SessionProposal) {
    try {
      console.log('SWEETS SESSION PROPOSAL')
      // ------- namespaces builder util ------------ //

      // ------- end namespaces builder util ------------ //

      const session = await web3Wallet.approveSession({
        id,
        namespaces: approvedNamespaces,
      })
      console.log('SWEETS session', session)
    } catch (error) {
      // use the error.message to show toast/info-box letting the user know that the connection attempt was unsuccessful

      await web3Wallet.rejectSession({
        id,
        reason: getSdkError('USER_REJECTED'),
      })
    }
  }

  return <Button onClick={handleClick}>WALLET CONNECT PROPOSAL</Button>
}

export default WalletConnectActivityButton
