import { Prefecture } from '@/api/types'
import React from 'react'

export type CheckboxProps = Prefecture & {
  selected?: boolean
  onClick?: (props: CheckboxProps) => void
}

const Checkbox = React.memo(function Check(props: CheckboxProps) {
  return (
    <label className='grid-item'>
      <input
        id={props.prefName}
        type={'checkbox'}
        checked={props.selected || false}
        onChange={() => props.onClick && props.onClick(props)}
      />
      {props.prefName}
    </label>
  )
})

export default Checkbox
