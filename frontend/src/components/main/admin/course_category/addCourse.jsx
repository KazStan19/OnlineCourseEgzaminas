import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import CategoryServicas from '../../../../services/categoryServices'
import CourseServices from '../../../../services/courseServices'
import { LoadingPage } from '../../loadingPage'

export const AddCourse = (props) => {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({

    user: props.userId,
    category: "Open this select menu",
    desc: '',
    title: '',
    price: '',
    

  })

  const {category,desc, price, title, user} = userInfo

  useEffect(() => {
    setLoading(true)
    CategoryServicas.getCategories().then(item =>{
      setLoading(false)
      setCategories(item)

    })
    
  }, [])

  const onChange = (e) => {

    setUserInfo((prevState) => ({

      ...prevState,
      [e.target.name]:e.target.value

    }))

  }

 

  const onSubmit = (e) => {

    e.preventDefault()
    CourseServices.addCourse(props.role,user,category,desc,title,price)

  }
  
  
  return (!loading ? <Container><Form className='text-center text-white' >
      <h1>Fill in course</h1>
      <Form.Group className="mb-3" controlId="formGroup2Title">
        <Form.Label>Title</Form.Label>
        <Form.Control required onChange={onChange} value={title} name='title' type="text" placeholder="Enter course title" />
      </Form.Group>

      <Form.Group controlId="formGrid2Description">
        <Form.Label>Description</Form.Label>
        <Form.Control
            required
            as="textarea"
            value={desc}
            name={"desc"}
            onChange={onChange}
            placeholder="Leave a Description here"
            style={{ height: '100px' }}
          />
      </Form.Group>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGroup2Price">
        <Form.Label>Price</Form.Label>
        <Form.Control required onChange={onChange} value={price} name='price' type="number" placeholder="enter price" />
      </Form.Group>
      <Form.Group as={Col} controlId="formGrid2Category">
        <Form.Label>Select category</Form.Label>
        <Form.Select required value={category} name='category' onChange={onChange} aria-label="Default select example">
          <option disabled value='Open this select menu'>Open this select menu</option>
          {categories.map(item =>{

            return(

              <option value={item._id}>{item.name}</option>

            )

          })}
        </Form.Select>
      </Form.Group>
      </Row>
      
      <Row>
      <Form.Group as={Col}>
      <Button className="btn btn-primary w-25" onClick={onSubmit}>
        Add
      </Button>
      </Form.Group>
      <Form.Group as={Col}>
      <Button  className="btn btn-danger w-25" onClick={(e)=>{e.preventDefault();window.location.replace('/')}}>
        Cancal
      </Button>
      </Form.Group>
      </Row>

    </Form> </Container>: <LoadingPage/>
  )
}