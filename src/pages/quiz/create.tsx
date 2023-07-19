import { Toast } from "@components/Toast";
import { AdminLayout, UserLayout } from "@layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form, } from "react-bootstrap";

export default function CreateStudent() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [inputs, setInputs]: any = useState({})
  const [isShownToast, setIsShownToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target as HTMLInputElement
    setInputs({ ...inputs, [name]: value })
  }
 
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const {data:user} = await axios.get('/api/mock/me')
      await axios.post('/api/quiz/create', { ...inputs ,guru_id:user.id})
      router.push('/quiz')
    }
    catch (error: any) {
      setToastMessage(error.response.data.message)
      setIsShownToast(true)
    }
  }

  return (
    <>

      <UserLayout>
        {isShownToast && (
          <Toast
            message={toastMessage}
            type="error"
            onClick={() => setIsShownToast(false)}
          />
        )}
        <div className="bg-white  px-5 py-5 shadow-sm rounded-2">
          <h1 className="mb-3">Buat Soal  Baru</h1>
          <form action="" className="mt-3" onSubmit={handleSubmit} encType="">
            <Form.Group className="mb-3" >
              <Form.Label>Nama Soal</Form.Label>
              <Form.Control type="text" placeholder="Nama Soal" name="title" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Tipe Soal</Form.Label>
              <Form.Control as="select" name="type" onChange={handleChange}>
                <option value="TUGAS" selected>TUGAS</option>
                <option value="UTS">UTS</option>
                <option value="UAS">UAS</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Upload Soal</Form.Label>
              <Form.Control type="url" placeholder="Soal" name="quiz" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>tenggat</Form.Label>
              <Form.Control type="date" min={new Date().toISOString().split('T')[0]} placeholder="Soal" name="expired_at" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Deskripsi" name="description" onChange={handleChange} />
            </Form.Group>
            <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Submit</Button>
          </form>
        </div>

      </UserLayout>
    </>
  )
}