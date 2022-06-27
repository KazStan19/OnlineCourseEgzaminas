import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

import userServices from '../../services/userServices'

export const LecturerForm = () => {

  const [userInfo, setUserInfo] = useState({

    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    role: 'lecturer',

  })

  const {firstName,lastName, email, password, password2,role} = userInfo
  


  const onChange = (e) => {

    setUserInfo((prevState) => ({

      ...prevState,
      [e.target.name]:e.target.value

    }))

  }

  const onSubmit = (e) => {

    e.preventDefault()

    if(password === password2){

      userServices.registerUser(firstName,lastName, email, password,role)
      
    }
    else{

      alert("passwords do not match")
      setUserInfo({

        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        role: 'lecturer',
    
      })

    }

  }
  
  
  return (
    <Form className='text-center' >
      <h1>Hello new Lecturer</h1>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGrid2Email">
          <Form.Label>First Name</Form.Label>
          <Form.Control onChange={onChange} value={firstName} name='firstName' type="text" placeholder="Enter First Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGrid2Password">
          <Form.Label>Last Name</Form.Label>
          <Form.Control onChange={onChange} value={lastName} name='lastName' type="text" placeholder="Enter Last Name" />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGroup2Email">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={onChange} value={email} name='email' type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroup2Password">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={onChange} value={password} name='password' type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroup2Password2">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control onChange={onChange} value={password2} name='password2' type="password" placeholder="Confirm password" />
      </Form.Group>

      <button className="btn btn-primary" onClick={onSubmit}>
        Register
      </button>
    </Form>
  )
}