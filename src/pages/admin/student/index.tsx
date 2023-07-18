import type { NextPage } from 'next'
import { AdminLayout } from '@layout'
import React, { useEffect } from 'react'
import Table from '@components/Table/Table'
import Link from 'next/link'
import axios from 'axios'
const Student: NextPage = () => {
  const [students,setStudents] = React.useState([])
  useEffect(() => {
    axios.get('/api/student').then(response => {
      setStudents(response.data.data.map((student: any) => {
        return {
          ...student,
          kelas: student.kelas.nama
        }
      }))
    })
  },[])
  return (

  <AdminLayout>
    {/* button create student */}
    <h1>Siswa</h1>
    <Link href={'/admin/student/create'}  className=' btn btn-info mb-3'>Buat Siswa Baru</Link>
    <Table datas={students} headers={['nis','nama','kelas']} />
  </AdminLayout>
)}

export default Student
