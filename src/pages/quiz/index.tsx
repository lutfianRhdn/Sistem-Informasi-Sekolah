import { UserLayout } from "@layout"
import { Button, Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap"
import { useEffect, useState } from "react";
import Link from "next/link";
import { QuizCard } from "@components/QuizCard";
import axios from "axios";
export default () => {
  const [quiz, setQuiz]:any = useState([])
  useEffect(() => {
    axios.get('/api/mock/me').then(res => {
      axios.get('/api/quiz?guru_id=' + res.data?.id || '').then(resQuiz => {
        setQuiz([...resQuiz.data]  )
      })
    })
  }, [])
 
  return (
    <>
      <UserLayout>
        <h1 className="mb-5">Soal Ujian</h1>
        <Link href="/quiz/create" className="btn btn-info mb-3">
          Buat Soal Baru 
        </Link>
        <Row md={3}>
          {quiz&&quiz.map((item: any,index:number) => (
            <Col key={index}>
              <QuizCard description={item.description} id={item.id} path_file={item.pah_file} title={item.title} type={ item.type} />
          </Col>
            ))}
        </Row>
      </UserLayout>
    </>
  )
}