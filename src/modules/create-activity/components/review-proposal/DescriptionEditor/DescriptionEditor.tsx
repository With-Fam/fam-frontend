'use client'

// Framework
import { useEffect, useState } from 'react'

// Third Parties
import ReactQuill from 'react-quill'
import { useFormContext } from 'react-hook-form'

// Components
import EditorToolbar, { modules, formats } from './EditorToolbar'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function DescriptionEditor(): JSX.Element {
  const { setValue, getValues } = useFormContext()
  const [state, setState] = useState({ value: '' })

  useEffect(() => {
    const description = getValues('description')
    if (description) {
      setState({ value: description })
    }
  }, [])

  const handleChange = (value: string) => {
    setState({ value })
    setValue('description', value)
  }

  return (
    <>
      <div className="order-2 flex grow flex-col sm:order-3">
        <ReactQuill
          theme="snow"
          value={state.value}
          onChange={handleChange}
          placeholder="Description"
          modules={modules}
          formats={formats}
          className="grow"
        />
      </div>
      <EditorToolbar />
    </>
  )
}
