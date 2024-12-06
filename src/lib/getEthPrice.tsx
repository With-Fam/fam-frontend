import axios from 'axios'

const getEthPrice = async () => {
  try {
    const response = await axios.get('/api/getEthPrice')
    return response?.data?.USD || 0
  } catch (err) {
    return 0
  }
}

export default getEthPrice
