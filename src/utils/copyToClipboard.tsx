const copyToClipboard = async (textToCopy: string) => {
  try {
    await navigator.clipboard.writeText(textToCopy)
    return true
  } catch (error) {
    return false
  }
}

export default copyToClipboard
