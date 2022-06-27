import React, { useEffect, useState } from 'react'
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import courseServices from '../../services/courseServices'
import { LoadingPage } from './loadingPage'
import { AiOutlineRest , AiFillEdit} from "react-icons/ai";
import { UpdateCourse } from './admin/course_category/updateCourse'
import UserServices from '../../services/userServices'

function LandingPage(props) {
  
  const [data, setData] = useState([])
  const [updateToggle, setUpdateToggle] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updateCourse, setUpdateCourse] = useState([])
  const {categoryID} = useParams()

  useEffect(() => {

    setLoading(true)

    courseServices.getCourses()
    .then(course =>{

      if(categoryID === undefined)setData(course)
      else setData(course.filter(item => item.categorie._id === categoryID))

    })
  
    setLoading(false)

  },[])

  const deleteHandler = (key) => {

    courseServices.deleteCourse(key,props.user.role)

  }





  if(loading === true){

    return(<LoadingPage/>)

  }
  else{

    return updateToggle === false ? <Container>
      <Row xs={1} md={2} className="g-4">
      {data.map(item =>{

        return(
          <Col key={item._id}>
          <Card>
            {props.loginState === true && props.user._id === item.user._id || props.user.role === 'admin' ? <div className='w-100 d-flex bg-dark justify-content-end'>
              <a href='#' className='text-white' onClick={(e)=>{

                e.preventDefault()
                deleteHandler(item._id)

              }}><AiOutlineRest/></a>
              <a href='#' className='text-white' onClick={(e)=>{

                e.preventDefault()
                setUpdateCourse(item)
                setUpdateToggle(!updateToggle)

              }}><AiFillEdit/></a>
            </div>:null}
            <Card.Header as="h1">
            {`${item.user.firstName} ${item.user.lastName}`}
            </Card.Header>
            <Card.Header as="h5">
            {item.title}
            </Card.Header>
            <Card.Body>
              <Card.Title>{item.categorie.name}</Card.Title>
              <Card.Text>
              {item.desc}
              </Card.Text>
              </Card.Body>
              <Card.Body className='d-flex justify-content-between'>
                <Card.Text as='h3'>
                {`${item.price} eur`}
                </Card.Text>
                {
                props.user ? props.user.boughtCourses.includes(item._id) === false ?
                <Button variant="success" onClick={(e)=>{

                  e.preventDefault()
                  UserServices.addCourse(props.user._id,item._id)

                }}>Buy course</Button>:<Button variant="danger" onClick={(e)=>{

                  e.preventDefault()
                  UserServices.deleteCourse(props.user._id,item._id)

                }}>Cancal</Button>:null
              }
              </Card.Body>
            </Card>
            </Col>
        )


      })}
      </Row>
    </Container> : <UpdateCourse role={props.user.role} course={updateCourse}/>

  }
}

export default LandingPage