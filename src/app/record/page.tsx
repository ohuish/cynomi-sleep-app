'use client'
import { Card, CardContent, CardHeader, Container, Grid } from '@/mui'
import RecordForm from './components/form'

export default function RecordPage() {
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
        <Card
          variant='elevation'
          sx={{
            m: 3,
          }}
        >
          <CardHeader title='Enter your sleep data' />
          <CardContent>
            <RecordForm />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
