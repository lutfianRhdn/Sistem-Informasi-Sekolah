import type { NextPage } from 'next'
import { AdminLayout } from '@layout'
import React, { useEffect } from 'react'
import Table from '@components/Table/Table'
import Link from 'next/link'
import axios from 'axios'
import { Form } from 'react-bootstrap'
const Student: NextPage = () => {
  const [classes, setClasses] = React.useState([])
  const [selected, setSelected] = React.useState('')
  useEffect(() => {
    axios.get('/api/class').then(response => {
      setClasses(response.data)
    })
  }, [])
  const onWaliKelasChange = (data: any) => {
    console.log(data)
  }
  return (

    <AdminLayout>
      <h1>Kelas</h1>
      <Link href={'/admin/class/create'} className=' btn btn-info mb-3'>Buat Kelas Baru</Link>
      <Table datas={classes || []} headers={['nama']}  />      
    </AdminLayout>
  )
}

export default Student
