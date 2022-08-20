import { API_ENDPOINT, authHeader, Population, Prefecture } from "@/api";
import React from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineProps,
} from "recharts";

type Props = {
  prefectureList: Prefecture[];
};

type ChartItem = {
  year: number;
  [key: string]: number;
};

type ChartData = ChartItem[];

const colors: string[] = [
  "#82ca9d",
  "#E0BBE4",
  "#957DAD",
  "#FFBF00",
  "#FD9654",
  "#FB7C53",
  "#B03F3C",
  "#6A3F29",
  "#F4DBC7",
  "#5C1D60",
];

const Chart = (props: Props) => {
  const [res, setRes] = React.useState<{ [k: string]: Population[] }>({});

  console.log("chart");

  const data = React.useMemo<ChartData>(() => {
    const newData: ChartData = [];
    for (const key in res) {
      for (const population of res[key]) {
        const populationYearIndex = newData.findIndex(
          (item) => item.year === population.year
        );
        if (populationYearIndex !== -1) {
          newData[populationYearIndex] = {
            ...newData[populationYearIndex],
            [key]: population.value,
          };
        } else {
          newData.push({
            year: population.year,
            [key]: population.value,
          });
        }
      }
    }
    return newData;
  }, [res]);

  const getPopulationList = React.useCallback(
    async (prefecture: Prefecture) => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}api/v1/population/composition/perYear`,
          {
            params: { prefCode: prefecture.prefCode, cityCode: "-" },
            headers: authHeader,
          }
        );
        const name = prefecture.prefName;
        const data = response.data?.result.data[0].data as Population[];
        setRes((res) => ({ ...res, [name]: data }));
        // setRes((res) => {
        //   res[name] = data;
        //   return res;
        // });
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  React.useEffect(() => {
    Promise.all(props.prefectureList.map((pre) => getPopulationList(pre)));
  }, [getPopulationList, props.prefectureList]);

  console.log(res);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 40,
          right: 50,
          left: 50,
          bottom: 25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          // label="jinkousuu"
          label={{
            value: "jinkousuu",
            position: "insideBottomRight",
            offset: -20,
          }}
        />
        <YAxis
          label={{
            value: "jinkousuu",
            position: "insideTopLeft",
            // angle: -90,
            offset: -30,
          }}
        />
        <Tooltip />
        <Legend verticalAlign="top" layout="vertical" align="right" />
        {props.prefectureList.map((pre, id) => (
          <Line
            key={pre.prefCode}
            id={pre.prefName}
            type="monotone"
            dataKey={pre.prefName}
            stroke={colors[id % colors.length]}
            animationBegin={100}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;

type MemoLineProps = {
  key: number;
  dataKey: string;
  stroke: string;
};

const MemoLine = React.memo((props: MemoLineProps) => {
  return <Line {...props} type="monotone" />;
});
// function MemoLine(props: LineProps) {
//   return <Line {...props} />;
// }
