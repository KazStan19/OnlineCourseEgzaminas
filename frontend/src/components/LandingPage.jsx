import React, { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import CourseServices from "../services/courseServices"
import { LoadingPage } from "./loadingPage"
import { AiOutlineRest , AiFillEdit ,AiFillLike} from "react-icons/ai";
import { UpdateCourse } from "./lecturer/updateCourse"
import UserServices from "../services/userServices"

function LandingPage(props) {
  
  const [data, setData] = useState([])
  const [updateToggle, setUpdateToggle] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updateCourse, setUpdateCourse] = useState([])
  const [search, setSearch] = useState("")
  const {categoryID} = useParams()


  useEffect(() => {

    setLoading(true)

    CourseServices.getCourses()
    .then(course =>{
      
      setData(course)
      
    })
  
    setLoading(false)

  },[])

  const deleteHandler = (key) => {

    CourseServices.deleteCourse(key,props.user.role)

  }

  const onChange = (e) => {

    setSearch(e.target.value)

  }

  if(loading === true){

    return(<LoadingPage/>)

  }
  else{

    return updateToggle === false ? <Container>
      <Form className="mb-4">

      <Form.Group as={Col}>
          <Form.Control className="text-center" onChange={onChange} value={search} type="text" placeholder="search here (eg. lecturer, course catagory)" />
        </Form.Group>

      </Form>
      <Row xs={1} md={2} className="g-4">
      { data.filter(courseFiltered => {

          if(search == ""){

              return courseFiltered

          }
          else if(courseFiltered.user.firstName.toLowerCase().includes(search.toLowerCase()) || courseFiltered.user.lastName.toLowerCase().includes(search.toLowerCase()) || courseFiltered.categorie.name.toLowerCase().includes(search.toLowerCase())){

              return courseFiltered

          }
          }).map(item =>{
        return(
          <Col key={item._id}>
          <Card >
            {props.loginState === true && props.user._id === item.user._id || props.user.role === "admin" ? <div className="w-100 d-flex bg-dark justify-content-end">
              <a href="#" className="text-white" onClick={(e)=>{

                e.preventDefault()
                deleteHandler(item._id)

              }}><AiOutlineRest/></a>
              <a href="#" className="text-white" onClick={(e)=>{

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
              <Card.Title >{item.categorie.name}</Card.Title>
              <Card.Text>
              {item.desc}
              </Card.Text>
              </Card.Body>
              <Card.Body className="d-flex justify-content-between">
                <Card.Text as="h3">
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
              {props.loginState === true && props.user._id === item.user._id || props.user.role === "admin" ? <div className="w-100 d-flex bg-dark justify-content-end">
              <a href="#" className="text-white text-decoration-none m-1" onClick={(e)=>{

                e.preventDefault()
                if(item.likes.includes(props.user._id) === true)CourseServices.likeCourse(item._id,props.user._id,"minus")
                else CourseServices.likeCourse(item._id,props.user._id,"plus")
              }}><AiFillLike/>{item.likeCount}</a>
            </div>:<div className="w-100 d-flex bg-dark justify-content-end">
              <p  className="text-white m-1" onClick={(e)=>{
                e.preventDefault()
                alert("please login to use this function")
              }}><AiFillLike/>{item.likeCount}</p>
            </div>}
            </Card>
            </Col>
        )


      })}
      </Row>
    </Container> : <UpdateCourse role={props.user.role} course={updateCourse}/>

  }
}

export default LandingPage