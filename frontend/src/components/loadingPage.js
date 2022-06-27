import React from 'react'
import { Container } from 'react-bootstrap'

export const LoadingPage = () => {
  return (
    <Container style={{width:100 + 'vw',height:100 + 'vh'}} className='text-center text-white d-flex justify-content-center align-items-center'>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    {'   '}
    <h1>Lodding page...</h1>
    </Container>
  )
}