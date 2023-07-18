import { Toast } from "@components/Toast";
import { AdminLayout } from "@layout";
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
  const [classes, setClasses] = useState([])
  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target as HTMLInputElement
    setInputs({ ...inputs, [name]: value })
  }
  useEffect(() => {
    axios.get('/api/class').then(response => {
      setClasses(response.data)
    })
  }, [])
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!inputs.nip || !inputs.name || !inputs.address || !inputs.subject) {
      setIsShownToast(true)
      setToastMessage('Form tidak boleh kosong')
      return false

    }
    if (inputs.nip.length !== 18) {
      setIsShownToast(true)
      setToastMessage('NIP harus 18 digit')
      return false
    }
    setSubmitting(true)
    try {
      console.log(inputs)
      await axios.post('/api/teacher/create', inputs)
      router.push('/admin/teacher')
    }
    catch (error: any) {
      setToastMessage(error.response.data.message)
      setIsShownToast(true)
    }
  }

  return (
    <>

      <AdminLayout>
        {isShownToast && (
          <Toast
            message={toastMessage}
            type="error"
            onClick={() => setIsShownToast(false)}
          />
        )}
        <div className="bg-white  px-5 py-5 shadow-sm rounded-2">
          <h1 className="mb-3">Buat Guru Baru</h1>
          <form action="" className="mt-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Label>Nomor Induk Pegawai</Form.Label>
              <Form.Control type="text" placeholder="Nomor Induk Pegawai" name="nip" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Guru</Form.Label>
              <Form.Control type="text" placeholder="Nama" name="name" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat Guru</Form.Label>
              <Form.Control type="text" placeholder="Alamat" name="address" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mata Pelajaran</Form.Label>
              <Form.Control type="text" placeholder="Mata Pelajaran" name="subject" onChange={handleChange} />

            </Form.Group>


            <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Submit</Button>
          </form>
        </div>

      </AdminLayout>
    </>
  )
}