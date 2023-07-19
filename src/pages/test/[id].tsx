import { UserLayout } from "@layout"
import { Button, Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap"
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { QuizCard } from "@components/QuizCard";
import axios from "axios";
import { useRouter } from 'next/router'
export default function TestDetail({ }) {
  const [quiz, setQuiz]: any = useState([])
  const [teacher, setTeacher]: any = useState({})
  const [user ,setUser] :any= useState({})
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    axios.get('/api/mock/me').then(res => {
      setUser(res.data)
    })
  }, [])
  useEffect(() => {
    if (!id) return
    axios.get('/api/teacher/' + id).then(res => {
      setTeacher(res.data)
    })

    // // axios.get(`/api/answer?guru_id=${id}&murid_id=${user.id}`  || '').then(res => {
    //   console.log(res.data)
    // })
    if(!user.id) return
    axios.get(`/api/quiz?guru_id=${+id}&murid_id=${user.id}` || '').then(resQuiz => {
        setQuiz([...resQuiz.data])
    })
  }, [id,user])

  return (
    <>
      <UserLayout>
        <h1 className="">Soal Ujian Mata Pelajaran { teacher.mata_pelajaran ||''}</h1>
        <h5>{ teacher.nama}</h5>
        <Row md={3} className="mt-5">
          {quiz && quiz.map((item: any, index: number) => (
            <Col key={index}>
              <QuizCard role='student' is_answered={item.jawaban.length >0} description={item.description} id={item.id} path_file={item.path_file} title={item.title} type={item.type} />
            </Col>
          ))}
        </Row>
      </UserLayout>
    </>
  )
}