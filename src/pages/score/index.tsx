import { UserLayout } from "@layout"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"

export default function Score() {
  const [students, setStudents] = useState([])
  useEffect(() => {
    console.log('Score')
    axios.get('/api/student').then(res => {
      console.log(res.data)
      setStudents(res.data.data)
    })
      
  }, [])
  return (
    <>
        <UserLayout>
          <h1 className="mb-5">Pelajaran</h1>
          <Row>
            { students && students.map((item: any, index: number) => (
              <Col md={3}>
                <Card>
                 
                  <Card.Body>

                    <h6>{item.nama}</h6>
                  </Card.Body>
                  <Card.Footer>

                    <Link href={`/score/${item.nis}`} className="btn btn-primary">
                      Pilih Murid
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