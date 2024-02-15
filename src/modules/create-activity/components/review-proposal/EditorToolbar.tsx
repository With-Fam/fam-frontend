'use client'

// Third Parties
import { Quill } from 'react-quill'

// Quill config
const Size = Quill.import('formats/size')
Size.whitelist = ['extra-small', 'small', 'medium', 'large']
Quill.register(Size, true)

const Font = Quill.import('formats/font')
Font.whitelist = ['arial']
Quill.register(Font, true)

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
}

export const formats = [
  'size',
  'font',
  'bold',
  'italic',
  'underline',
  'bullet',
  'list',
  'link',
  'image',
]

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export const MobileEditorToolbar = (): JSX.Element => (
  <div id="toolbar">
    <span className="ql-formats text-picker">
      <select className="ql-size" defaultValue="medium">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-list" value="bullet" />
      <button className="ql-link" />
      <button className="ql-image" />
    </span>
  </div>
)

export default MobileEditorToolbar
