import React from 'react'
import { Container } from 'react-bootstrap'

export const ErrorPage = () => {
  return (
    <Container style={{width:100 + 'vw',height:100 + 'vh'}} className='text-center text-white d-flex justify-content-center align-items-center'>
      <h1 className='text-white'> not found </h1>
    </Container>
  )
}
