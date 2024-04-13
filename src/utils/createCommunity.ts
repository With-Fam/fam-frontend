// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createCommunity = async (community: any) => {
  try {
    const response = await fetch('/api/create-community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

export default createCommunity
