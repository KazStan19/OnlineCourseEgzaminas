import React, { useEffect, useState } from 'react'
import {  Container, Row} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LecturerForm } from './LecturerForm'
import { UserForm } from './UserForm'

function Register() {
  
  const [type, setType] = useState('user')

  const navigate = useNavigate()

  useEffect(() => {
    let checkUser = JSON.parse(localStorage.getItem('user'))
    if(checkUser !== null){

      navigate('/')

    }
  }, [])
  
  const switchRole = (e) =>{

    e.preventDefault()


    setType(e.target.id)

  }

  return (
    <Container className='bg-white rounded p-3'>
    <Row>
    <button className="btn w-50" id='user' onClick={switchRole}>User</button>
    <button className="btn w-50" id='lecturer' onClick={switchRole}>Lecturer</button>
    </Row>
    {type === 'user' ? <UserForm/> : <LecturerForm/>}
    </Container>
  )
}

export default Register