import * as React from 'react'
import ReactECharts from 'echarts-for-react'
import dayjs from '@/dayjs'
import type { Gender, SleepHistoryResultMap } from '@/types'

type PersonSeriesData = {
  name: string
  gender: Gender
  data: string[]
}

export default function SleepChart({
  sleepHistory,
}: {
  sleepHistory: SleepHistoryResultMap
}) {
  // TODO: refactor this horrific memo, rotating and transforming to be a chart series
  const { uniqueDates, legendNames, series } = React.useMemo(() => {
    // get all unique dates
    const uniqueDates = Object.values(sleepHistory)
      .reduce<string[]>((acc, { sleeps }) => {
        for (const { date } of sleeps) {
          if (!acc.includes(date)) {
            acc.push(date)
          }
        }
        return acc
      }, [])
      .sort((a, b) => (a > b ? 1 : -1))

    // get all unique names
    const legendNames = Object.values(sleepHistory).reduce<string[]>(
      (acc, { name, gender }) => {
        const legendName = `${name} (${gender})`
        if (!acc.includes(legendName)) {
          acc.push(legendName)
        }
        return acc
      },
      [],
    )

    // fill series for each person with hours for each date
    // fill with `0` for missing data
    const series = Object.values(sleepHistory).reduce<PersonSeriesData[]>(
      (acc, { name, gender, sleeps }) => {
        const personSeriesData: PersonSeriesData = {
          name,
          gender,
          data: [],
        }
        for (const date of uniqueDates) {
          const sleepRecord = sleeps.find((sleep) => sleep.date === date)
          personSeriesData.data.push(sleepRecord?.hours ?? '0')
        }
        acc.push(personSeriesData)
        return acc
      },
      [],
    )

    return { uniqueDates, legendNames, series }
  }, [sleepHistory])

  const options = React.useMemo(() => {
    const labelOption = {
      show: true,
      formatter: '{c}',
      fontSize: 16,
      rich: {
        name: {},
      },
    }
    // generate Echarts options
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: legendNames,
        textStyle: {
          color: 'inherit',
        },
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: uniqueDates.map((date) => dayjs.utc(date).format('L')),
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: series.map((item) => ({
        name: `${item.name} (${item.gender})`,
        type: 'bar',
        barGap: 0,
        label: labelOption,
        data: item.data,
      })),
    }
  }, [uniqueDates, legendNames, series])

  return <ReactECharts option={options} notMerge={true} />
}
