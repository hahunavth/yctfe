import React from 'react'
import { Prefecture } from '@/api/types'

export type CheckboxProps = Prefecture & {
  selected?: boolean
  onClick?: (props: CheckboxProps) => void
}

/**
 * Checkbox
 * - React.memo to avoid unnecessary re renders
 */
const Checkbox = React.memo(function Check(props: CheckboxProps) {
  return (
    <label className='grid-item'>
      <input
        className='checkbox'
        id={props.prefName}
        type={'checkbox'}
        checked={props.selected || false}
        onChange={() => props.onClick && props.onClick(props)}
      />
      <span className='checkbox-label'>{props.prefName}</span>
    </label>
  )
})

export default Checkbox
