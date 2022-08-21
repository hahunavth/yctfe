import React from 'react'
import { getAPIPopulation, Population, Prefecture } from '@/api'
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

/**
 * ChartItem: Data structure to render chart
 * - year: The unique id of x-axis.
 * - key: The key or getter of a group of data which should be unique in a LineChart
 *
 * FIXME: Add or remove line cause all of lines rerender
 */
type ChartItem = {
  year: number
  [key: string]: number
}

// line chart with many color
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
  // NOTE: only for chart library
  // use css in js
  const isMobileDevice = useMediaQuery({
    query: '(max-device-width: 600px)',
  })
  // responsive style
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

  // res: api response
  const [res, setRes] = React.useState<{ [k: string]: Population[] }>({})

  // data: chart render data structure
  // -> data change when res change
  const data = React.useMemo<ChartItem[]>(() => {
    const newData: ChartItem[] = []
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
      const data = response.data?.result?.data[0].data as Population[]
      setRes((res) => ({ ...res, [name]: data }))
    } catch (e) {
      console.log(e)
    }
  }, [])

  React.useEffect(() => {
    // call api to get population info of selected prefecture and set state
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
            fontSize: style.fontSize,
            fontWeight: 600,
          }}
          fontSize={style.fontSize}
        />
        <Tooltip />
        <Legend verticalAlign='top' layout='vertical' align='right' />
        {/* multiple line charts */}
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
