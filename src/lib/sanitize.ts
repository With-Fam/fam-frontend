// This sanitizes a string for JSON by using the built-in JSON.stringify.
// JSON.stringify(testing input") => "testing input\"" (quotes are removed) => testing input\"
export const sanitizeStringForJSON = (input: string): string =>
  JSON.stringify(input).slice(1, -1)

export const sanitizeFileName = (input: string): string => {
  let sanitized = ''
  try {
    sanitized = input.replace(/\s/g, '').toLowerCase()
  } catch (e) {
    console.log('sanitizeFileName error', e)
  }
  return sanitized
}
