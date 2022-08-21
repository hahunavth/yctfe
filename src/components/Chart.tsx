import { getAPIPopulation, Population, Prefecture } from '@/api'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useMediaQuery } from 'react-responsive'

type Props = {
  prefectureList: Prefecture[]
}

type ChartItem = {
  year: number
  [key: string]: number
}

type ChartData = ChartItem[]

const colors: string[] = [
  '#82ca9d',
  '#E0BBE4',
  '#957DAD',
  '#FFBF00',
  '#FD9654',
  '#FB7C53',
  '#B03F3C',
  '#6A3F29',
  '#F4DBC7',
  '#5C1D60',
]

const Chart = (props: Props) => {
  // NOTE ONLY FOR CHART LIBRARY
  const isMobileDevice = useMediaQuery({
    query: '(max-device-width: 600px)',
  })

  const style = React.useMemo(() => {
    if (isMobileDevice) {
      return {
        fontSize: 10,
      }
    } else {
      return {
        fontSize: 15,
      }
    }
  }, [isMobileDevice])

  const [res, setRes] = React.useState<{ [k: string]: Population[] }>({})

  const data = React.useMemo<ChartData>(() => {
    const newData: ChartData = []
    for (const key in res) {
      for (const population of res[key]) {
        const populationYearIndex = newData.findIndex((item) => item.year === population.year)
        if (populationYearIndex !== -1) {
          newData[populationYearIndex] = {
            ...newData[populationYearIndex],
            [key]: population.value,
          }
        } else {
          newData.push({
            year: population.year,
            [key]: population.value,
          })
        }
      }
    }
    return newData
  }, [res])

  const getPopulationList = React.useCallback(async (prefecture: Prefecture) => {
    try {
      const response = await getAPIPopulation(prefecture.prefCode)
      const name = prefecture.prefName
      const data = response.data?.result.data[0].data as Population[]
      setRes((res) => ({ ...res, [name]: data }))
    } catch (e) {
      console.log(e)
    }
  }, [])

  React.useEffect(() => {
    Promise.all(props.prefectureList.map((pre) => getPopulationList(pre)))
  }, [getPopulationList, props.prefectureList])

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        data={data}
        margin={{
          top: 28,
          right: 4,
          left: 8,
          bottom: 24,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='year'
          padding={{ right: 32 }}
          label={{
            value: '年度',
            position: 'insideBottomRight',
            offset: -2,
            fontSize: style.fontSize,
            fontWeight: 600,
            lineHeight: 100,
          }}
          fontSize={style.fontSize}
          // allowDuplicatedCategory={false}
        />
        <YAxis
          padding={{ top: 48 }}
          label={{
            value: '人口数',
            position: 'insideTopLeft',
            // offset: -12,
            fontSize: style.fontSize,
            fontWeight: 600,
          }}
          fontSize={style.fontSize}
        />
        <Tooltip />
        <Legend verticalAlign='top' layout='vertical' align='right' />
        {props.prefectureList.map((pre, id) => (
          <Line
            key={pre.prefCode}
            id={pre.prefName}
            type='monotone'
            dataKey={pre.prefName}
            stroke={colors[id % colors.length]}
            animationBegin={100}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
