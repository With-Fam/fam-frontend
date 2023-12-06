'use client'

// Third Parties
import ReactQuill from 'react-quill'
import { Controller, useFormContext } from 'react-hook-form'

// Components
import EditorToolbar, { modules, formats } from './EditorToolbar'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

type DescriptionEditorProps = {
  name: string
  placeholder?: string
}

export function DescriptionEditor({
  name,
  placeholder = '',
}: DescriptionEditorProps): JSX.Element {
  const { control } = useFormContext()
  return (
    <>
      <div className="order-2 grow sm:order-3">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder}
              modules={modules}
              formats={formats}
              className="grow"
            />
          )}
        />
      </div>
      <div className="order-3 sm:order-1">
        <EditorToolbar />
      </div>
    </>
  )
}

export default DescriptionEditor
