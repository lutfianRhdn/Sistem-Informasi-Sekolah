import { UserLayout } from "@layout"
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap"
import { useEffect, useState } from "react";
import Link from "next/link";
import { QuizCard } from "@components/QuizCard";
import axios from "axios";
import { useRouter } from "next/router";
import { Toast } from "@components/Toast";
export default () => {
  const router = useRouter()
  const { id } = router.query
  const [quiz, setQuiz]: any = useState()
  const [inputs, setInputs]: any = useState({})
  const [isSHownToast, setIsShownToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success')

  useEffect(() => {
    if (!id) return
    axios.get('/api/answer?quiz_id=' + id).then(res => {
      setQuiz(res.data)
    })
  }, [id])
  const handleChange = (e: any, id: number) => {
    setInputs({
      id,
      value: e.target.value
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const updated = await axios.post('/api/answer/update-score', inputs)
    if (updated.data) {
      setIsShownToast(true)
      setToastMessage(`Nilai ${updated.data.murid.nama} berhasil diupdate`)
      setToastType('success')
    }

  }
  return (
    <>
      
      <UserLayout>
        {isSHownToast && (
          <Toast message={toastMessage} onClick={() => setIsShownToast(false)} type={toastType} />)}
        <h1>Jawaban Murid { quiz&& quiz.title}</h1>
        <Row md={3} className="mt-5">
          {quiz && quiz.jawaban.map((item: any, index: number) => (
          <Col key={index}>
            <Card className="">
              <Card.Header className="d-flex align-items-center justify-content-between">
                  <h3>{ item.murid.nama }</h3>
                  <h3>{item.murid.kelas.nama}</h3>
              </Card.Header>

              <Card.Body>

                <form className="d-flex justify-content-between" onSubmit={handleSubmit}>
                  <Form.Group className="" >
                    <Form.Control type="text" placeholder="Nilai" name="nilai" defaultValue={item.nilai} onChange={(e) => handleChange(e, item.id)} />
                  </Form.Group>
                  <div >
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </Card.Body>
              <Card.Footer>
                  <Link href={item.pah_file} target="_blank" className="btn btn-info w-100">
                  Lihat Jawaban
                </Link>
              </Card.Footer>
            </Card>
          </Col>
          ))}

        </Row>

      </UserLayout>
    </>
  )
}