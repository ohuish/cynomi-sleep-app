import { DataGrid, GridColDef, GridRowSelectionModel } from '@/mui'
import type { SleepOverviewResult } from '@/types'

const columns: GridColDef<SleepOverviewResult>[] = [
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'gender',
    headerName: 'Gender',
  },
  {
    field: '_count',
    headerName: 'Sleep Entries',
    valueGetter: (value: SleepOverviewResult['_count']) => value.sleeps,
  },
]

export default function SleepOverviewTable({
  sleepOverview,
  onRowSelect,
}: {
  sleepOverview: SleepOverviewResult[]
  onRowSelect: (rows: GridRowSelectionModel) => void
}) {
  return (
    <DataGrid
      autoHeight
      checkboxSelection
      onRowSelectionModelChange={onRowSelect}
      columns={columns}
      rows={sleepOverview}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
    />
  )
}
