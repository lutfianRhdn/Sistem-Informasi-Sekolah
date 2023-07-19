import { Toast } from "@components/Toast";
import { UserLayout } from "@layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function TestAnswer() {
  const router = useRouter()
  const { id } = router.query
  const [quiz, setQuiz]: any = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [inputs, setInputs]: any = useState({})
  const [isShownToast, setIsShownToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [user,setUser] :any= useState({})
  useEffect(() => {
    if (!id) return
    axios.get('/api/mock/me').then(res => {
      setUser(res.data)
    })
    axios.get('/api/quiz/' + id).then(res => {
      setQuiz(res.data)
    })
    // console.log()
  }, [id])

  const handleChange = (e: any) => {
    e.preventDefault()
    const { name, value } = e.target as HTMLInputElement
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post('/api/answer/create', { ...inputs, quiz_id: quiz.id,student_id:user.id })
      router.push('/test')
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

        <h1> Upload Jawaban {quiz.title}</h1>
        <h5> Mata Pelajaran {quiz?.guru && quiz?.guru.mata_pelajaran }</h5>
        <form action="" className="mt-3" onSubmit={handleSubmit} encType="">
          <Form.Group className="mb-3" >
            <Form.Label>Link Jawaban</Form.Label>
            <Form.Control type="text" placeholder="Link Jawaban" name="answer" onChange={handleChange} />
          </Form.Group>
         
          <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Submit</Button>
        </form>
          {/* <h1></h1> */}
        </div>

    </UserLayout>
    </>
  )
}
