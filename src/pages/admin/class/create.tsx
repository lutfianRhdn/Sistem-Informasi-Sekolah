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
    if (!inputs.name) {
      setIsShownToast(true)
      setToastMessage('Form tidak boleh kosong')
      return false

    }
    
    setSubmitting(true)
    try {
      await axios.post('/api/class/create', inputs)
      router.push('/admin/class')
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
          <h1 className="mb-3">Buat Siswa Baru</h1>
          <form action="" className="mt-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Label>Nama Kelas</Form.Label>
              <Form.Control type="text" placeholder="Kelas" name="name" onChange={handleChange} />
            </Form.Group>
            
            <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Submit</Button>
          </form>
        </div>

      </AdminLayout>
    </>
  )
}