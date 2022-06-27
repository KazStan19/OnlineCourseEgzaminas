import React, { useEffect, useState } from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import userServices from '../../services/userServices'
import { useNavigate } from 'react-router-dom'

function Login(props) {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  
  useEffect(() => {
    if(props.state === true || user !== null){
      
      navigate('/')

    }
  }, [user])
  

  const [userInfo, setUserInfo] = useState({

    email: '',
    password: '',

  })

  const {email, password} = userInfo
  
  const onChange = (e) => {

    setUserInfo((prevState) => ({

      ...prevState,
      [e.target.name]:e.target.value

    }))

  }

  const onSubmit = async() => {
      userServices.loginUser(email, password)
      setUser(localStorage.getItem("user"))
    }

  return (
    
    <Container className='bg-white rounded p-3'>
    <Form onSubmit={(e)=>{e.preventDefault();onSubmit();}} className='d-flex flex-column align-items-center' >
    <h1>Please login</h1>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={onChange} name='email' placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={onChange} name='password' placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" id="formGridCheckbox">
        <p>Don't have a account <a href="/register">Click here</a></p>
      </Form.Group>
      <Button variant="primary" type="submit">
        login
      </Button>
    </Form>
    </Container>

  )
}

export default Login