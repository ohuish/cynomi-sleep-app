'use client'

import * as React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  GridRowSelectionModel,
  Skeleton,
  Typography,
} from '@/mui'
import SleepOverviewTable from './components/overview-table'
import SleepChart from './components/chart'
import type {
  SleepHistoryResult,
  SleepHistoryResultMap,
  SleepOverviewResult,
} from '@/types'

export default function ViewPage() {
  const [sleepOverview, setSleepOverview] = React.useState<
    SleepOverviewResult[]
  >([])
  const [isLoadingSleepOverview, setIsLoadingSleepOverview] =
    React.useState(true)
  const [sleepHistory, setSleepHistory] = React.useState<SleepHistoryResultMap>(
    {},
  )
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>(
    [],
  )

  const handleRowSelect = (rowModel: GridRowSelectionModel) => {
    setSelectedRows(rowModel)
  }

  React.useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/sleep-overview')
      setSleepOverview(await res.json())
      setIsLoadingSleepOverview(false)
    })()
  }, [])

  React.useEffect(() => {
    // get sleep history for any ids that aren't already fetched in the local state
    // act as a cache to avoid redundant lookups of data already fetched
    ;(async () => {
      const idsToFetch = selectedRows.filter((row) => !sleepHistory[row])
      if (idsToFetch.length === 0) {
        return
      }
      const res = await fetch('/api/sleep-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(idsToFetch),
      })
      const newSleepHistory = (
        (await res.json()) as SleepHistoryResult[]
      ).reduce<SleepHistoryResultMap>((acc, history) => {
        acc[history.id] = history
        return acc
      }, {})
      setSleepHistory({ ...sleepHistory, ...newSleepHistory })
    })()
  }, [selectedRows, sleepHistory])

  const selectedSleepHistory = React.useMemo(() => {
    // filter sleep history to just those selected for rendering in the chart
    return Object.fromEntries(
      Object.entries(sleepHistory).filter(([uuid]) =>
        selectedRows.includes(uuid),
      ),
    )
  }, [selectedRows, sleepHistory])

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={9} md={6} xl={4}>
        <Card
          variant='elevation'
          sx={{
            m: 3,
          }}
        >
          <CardHeader title='Sleep Overview' />
          <CardContent>
            {isLoadingSleepOverview ? (
              <Skeleton
                variant='rectangular'
                sx={{
                  height: 400,
                }}
              />
            ) : (
              <SleepOverviewTable
                sleepOverview={sleepOverview}
                onRowSelect={handleRowSelect}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={9} md={6}>
          <Card
            variant='elevation'
            sx={{
              m: 3,
            }}
          >
            <CardHeader title='Sleep History' />
            <CardContent>
              {Object.keys(selectedSleepHistory).length > 0 ? (
                <SleepChart sleepHistory={selectedSleepHistory} />
              ) : (
                <Typography
                  align='center'
                  sx={{
                    height: 150,
                  }}
                >
                  Please select a person to view their sleep history
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}
