import React, { useState } from 'react'
import { Col,Container,Form,Row } from 'react-bootstrap'
import userServices from '../../services/userServices'

export const UpadateAcc = (props) => {

  const [userInfo, setUserInfo] = useState({

    firstName: props.user.firstName,
    lastName: props.user.lastName,
    email: props.user.email,
    updatedRole: props.user.role,

  })

  const {firstName,lastName, email ,updatedRole} = userInfo
  
  const onChange = (e) => {

    setUserInfo((prevState) => ({

      ...prevState,
      [e.target.name]:e.target.value

    }))

  }

  const onSubmit = (e) => {

    e.preventDefault()

    userServices.updateUser(props.user._id,props.role,updatedRole,firstName,lastName, email )
    
  }

  return (
    <Container>
    <Form className='text-center text-white rounded p-2 '>
      <h1>Hello new user</h1>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control onChange={onChange} value={firstName} name='firstName' type="text" placeholder="Enter First Name" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control onChange={onChange} value={lastName} name='lastName' type="text" placeholder="Enter Last Name" />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={onChange} value={email} name='email' type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Role</Form.Label>
        <Form.Select name='updatedRole' defaultValue={updatedRole} onChange={onChange}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="lecturer">Lecturer</option>
        </Form.Select>
      </Form.Group>
      <Row className="mb-3">
      <Form.Group as={Col} >
      <button className="btn btn-primary w-25" onClick={onSubmit}>
        Update
      </button>
      </Form.Group>
      <Form.Group as={Col} >
      <button  className="btn btn-danger w-25" onClick={()=>{window.location.reload()}}>
        Cancal
      </button>
      </Form.Group>
      </Row>
    </Form>
    </Container>
  )
}