import React, { ReactNode } from 'react'
import { getAPIPrefectures, Prefecture } from '@/api'
import { CheckboxProps } from '@/components/Checkbox'

type Props = {
  children: ReactNode
}

type PrefectureContextValue = {
  reqStt: 'success' | 'fail' | 'loading'
  prefList: CheckboxProps[]
  setReqStt: React.Dispatch<React.SetStateAction<'success' | 'fail' | 'loading'>>
  setPrefList: React.Dispatch<React.SetStateAction<CheckboxProps[]>>
}

/**
 * PrefectureContext:
 * - create context for manage app state
 * - pass default value null to ignore type check
 */
export const PrefectureContext = React.createContext<PrefectureContextValue>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  null as any,
)

/**
 * PrefectureProvider:
 * - wrap App component
 */
export default function PrefectureProvider(props: Props) {
  const [reqStt, setReqStt] = React.useState<'success' | 'fail' | 'loading'>('loading')
  const [prefList, setPrefList] = React.useState<CheckboxProps[]>([])

  React.useEffect(() => {
    // fetch prefectures in first time component render
    if (reqStt === 'loading')
      (() => {
        getAPIPrefectures()
          .then((response) => {
            setReqStt('success')
            const result = response.data?.result as Prefecture[]
            setPrefList(
              result.map((pre) => ({
                ...pre,
                selected: false,
              })),
            )
          })
          .catch(() => setReqStt('fail'))
      })()
  }, [reqStt])

  const value: PrefectureContextValue = {
    reqStt,
    prefList,
    setReqStt,
    setPrefList,
  }

  return <PrefectureContext.Provider value={value}>{props.children}</PrefectureContext.Provider>
}
