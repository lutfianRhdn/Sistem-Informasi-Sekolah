import { UserLayout } from "@layout"
import { Button, Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap"
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { QuizCard } from "@components/QuizCard";
import axios from "axios";
import { useRouter } from 'next/router'
import Table from "@components/Table/Table";
export default function TestDetail({ }) {
  const [nilai, setNilai]: any = useState([])
  const [student, setStudent]: any = useState()
  const router = useRouter()
  const { nis } = router.query
  
  useEffect(() => {
    if (!nis) return
    axios.get(`/api/score/${nis}`).then(response => {
      setNilai(response.data)
    })
    axios.get(`/api/student?nis=${nis}`).then(response => {
      setStudent(response.data.data[0])
    })
  }, [nis])

  return (
    <>
      <UserLayout>
        <h1>Nilai {student && student.nama}</h1>
        <small> <i> nilai akhir=( 25% x Tugas ) + ( 40% x UTS ) + ( 45% x UAS ) </i></small>
        <Table datas={nilai ||[]} headers={['mata_pelajaran', 'tugas', 'uts', 'uas', 'nilai_akhir']} isHiddenAction={true} />
      </UserLayout>
    </>
  )
}