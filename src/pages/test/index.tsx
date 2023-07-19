import { UserLayout } from "@layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function Test() {
  const [teacher, setTeacher] = useState([])
  useEffect(() => {
    axios.get('/api/teacher').then(res => {
      console.log(res.data)
      setTeacher(res.data)
    })
    },[])
  return (
    <UserLayout>
      <h1 className="mb-5">Pelajaran</h1>
      <Row>
        {teacher.map((item: any, index: number) => (

          <Col md={3}>
            <Card>
              <Card.Header>
                <h5>{ item.mata_pelajaran }</h5>
              </Card.Header>
              <Card.Body>
              
                <h6>{ item.nama}</h6>
              </Card.Body>
              <Card.Footer>

                <Link href={`/test/${item.id}`} className="btn btn-primary">
                  Pilih Mata Pelajaran
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
    </Row>
      </UserLayout>
  )
}