import * as Yup from 'yup'

const re =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gm

export const urlValidationSchema = Yup.string()
  .transform((value: string) => (value ? value.replace(/\/$/, '') : ''))
  .matches(re, { message: 'invalid url', excludeEmptyString: true })
