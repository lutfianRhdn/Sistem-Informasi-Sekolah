
import { NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {
  Button, Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { Toast } from '@components/Toast'
import Link from 'next/link'

const Login: NextPage = () => {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [inputs, setInputs] = useState({})
  const [isShownToast, setIsShownToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const getRedirect = () => {
    const redirect = getCookie('redirect')
    if (redirect) {
      deleteCookie('redirect')
      return redirect.toString()
    }

    return '/'
  }

  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault()
    const { name, value } = e.target as HTMLInputElement
    setInputs({ ...inputs, [name]: value })
  }
  const login = async (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setSubmitting(true)

    try {
      const res = await axios.post('api/mock/login', inputs)
      if (res.status === 200) {
        console.log(res.data)
        switch (res.data.role) {
          case 'admin':
            router.push('/admin')
            break
            default:
            router.push('/dashboard')
            break
        }
        // router.push('/admin')
        
      }
      setSubmitting(false)
    } catch (error: any) {
      setIsShownToast(true)
      setToastMessage(error.response.data.error)
      console.log({error})
    }
  }

  return (
    <>
      {isShownToast && (
        <Toast
          message={toastMessage}
          type="error"
          onClick={() => setIsShownToast(false)}
        />
      )}
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>Login</h1>
                  <p className="text-black-50">Login </p>

                  <form onSubmit={login}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faUser}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                    name="username"
                    required
                    disabled={submitting}
                    placeholder="Nip/Nis"
                    aria-label="Nip/Nis"
                    type='number'
                    onChange={ handleChange }
                        defaultValue={inputs.username ||''}
                      />
                    </InputGroup>

                    <InputGroup className="mb-1">
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={faLock}
                          fixedWidth
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        disabled={submitting}
                        placeholder="Password"
                        aria-label="Password"
                    defaultValue={inputs.password ||''}
                    onChange={handleChange}
                    
                      />
                    </InputGroup>
                  <Link className='' href="wali-kelas-login" >
                    <i>  Login Sebagai Wali Kelas</i>
                  </Link>
                <Row className='justify-content-between mt-3'>
                      <Col xs={6}>
                        <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Login</Button>
                    </Col>
                  
                    </Row>
                  </form>
                </div>
              </Col>
              
        </Row>
      </Container>
    </div>
    </>
  )
}

export default Login
