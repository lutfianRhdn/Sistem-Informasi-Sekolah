import type { NextPage } from 'next'
import { AdminLayout } from '@layout'
import React, { useEffect } from 'react'
import Table from '@components/Table/Table'
import Link from 'next/link'
import axios from 'axios'
const Teacher: NextPage = () => {
  const [teachers, setTeachers] = React.useState([])
  useEffect(() => {
    axios.get('/api/teacher').then(response => {
      setTeachers(response.data)
    })
  }, [])
  return (

    <AdminLayout>
      <h1>Guru</h1>
      <Link href={'/admin/teacher/create'} className=' btn btn-info mb-3'>Buat Guru Baru</Link>
      <Table datas={teachers || []} headers={['nip','nama','mata_pelajaran','alamat']} />
    </AdminLayout>
  )
}

export default Teacher
