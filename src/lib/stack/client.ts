import { StackClient } from '@stackso/js-core'

if (!process.env.STACK_API_KEY) {
  throw new Error('STACK_API_KEY is not set')
}

const stack = new StackClient({
  apiKey: process.env.STACK_API_KEY,
  pointSystemId: 6298,
})

export default stack
