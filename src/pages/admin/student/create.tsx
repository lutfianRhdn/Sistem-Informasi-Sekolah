import { Toast } from "@components/Toast";
import { AdminLayout } from "@layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form,  } from "react-bootstrap";

export default function CreateStudent() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [inputs, setInputs]:any = useState({})
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
    if (!inputs.nis || !inputs.name || !inputs.address || !inputs.class_id) {
      setIsShownToast(true)
      setToastMessage('Form tidak boleh kosong')
      return false

    }
    console.log(inputs.nis.length)
    if (inputs.nis.length !== 8) {
      setIsShownToast(true)
      setToastMessage('NIS harus 8 digit')
      return false
    }
    setSubmitting(true)
    try {
      console.log(inputs)
      await axios.post('/api/student/register', inputs)
      router.push('/admin/student')
    }
    catch (error:any) {
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
              <Form.Label>Nomor Induk Siswa</Form.Label>
              <Form.Control type="text" placeholder="Nomor Induk Siswa" name="nis" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Siswa</Form.Label>
              <Form.Control type="text" placeholder="Nama" name="name" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat Siswa</Form.Label>
              <Form.Control type="text" placeholder="Alamat" name="address" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kelas</Form.Label>
              <Form.Select aria-label="Pilih Kelas" name="class_id" onChange={handleChange}>
                <option disabled  selected>Pilih Kelas</option>
                {classes &&classes.map((kelas: any,index) => (
                  <option value={kelas?.id } key={index}>{kelas?.nama}</option>
                ))}
              </Form.Select>
            </Form.Group>


            <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Submit</Button>
          </form>
        </div>

      </AdminLayout>
    </>
  )
}