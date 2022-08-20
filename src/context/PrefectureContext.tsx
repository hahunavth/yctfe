import React, { ReactNode } from 'react'
import axios from 'axios'
import { API_ENDPOINT, authHeader, Prefecture } from '@/api'
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

export const PrefectureContext = React.createContext<PrefectureContextValue>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  null as any,
)

export default function PrefectureProvider(props: Props) {
  const [reqStt, setReqStt] = React.useState<'success' | 'fail' | 'loading'>('loading')
  const [prefList, setPrefList] = React.useState<CheckboxProps[]>([])

  React.useEffect(() => {
    if (reqStt === 'loading')
      (async () => {
        axios
          .get(`${API_ENDPOINT}api/v1/prefectures`, {
            headers: authHeader,
          })
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
