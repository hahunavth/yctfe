import React from 'react'
import { PrefectureContextValue } from '@/context/PrefectureContext'
import Checkbox, { CheckboxProps } from './Checkbox'

/**
 * render list of prefecture checkbox
 */
const PrefectureList = ({ prefList, reqStt, setPrefList, setReqStt }: PrefectureContextValue) => {
  // on click checkbox, set selected = true
  const onClickCheckBox = React.useCallback(
    (props: CheckboxProps) => {
      setPrefList((state) =>
        state.map((v) =>
          // eslint-disable-next-line react/prop-types
          v.prefCode === props.prefCode ? { ...v, selected: !v.selected } : v,
        ),
      )
    },
    [setPrefList],
  )

  if (reqStt === 'success')
    return (
      // render list
      <div className='grid-container'>
        {prefList.map((prop) => (
          <Checkbox key={prop.prefCode} {...prop} onClick={onClickCheckBox} />
        ))}
      </div>
    )
  else if (reqStt === 'fail') {
    // if fail load API -> show reload button
    return (
      <div>
        <div>Load failed!</div>
        <button onClick={() => setReqStt('loading')}>reload</button>
      </div>
    )
  } else {
    // loading
    return <div>Loading</div>
  }
}

export default PrefectureList
