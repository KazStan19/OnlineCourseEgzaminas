import React, { useEffect, useState } from "react"
import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import CategoryServicas from "../services/categoryServices"
import { IoBookOutline } from "react-icons/io5";

export const HeaderNav = (props) => {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const goTo = useNavigate()

  useEffect(() => {
    setLoading(true)
    CategoryServicas.getCategories().then(item =>{
      setLoading(false)
      setCategories(item)

    })
    
  }, [])

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">
      <IoBookOutline/>{"  "}Online Courses
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      
      {props.state === false ?<Nav className="me-auto">
        <Nav.Link href="/login" >Login</Nav.Link>
        <Nav.Link href="/register" >Register</Nav.Link>
      </Nav> : <Nav className="me-auto">
        {props.role === "admin" || props.role === "lecturer" ? <Nav.Link href="/addCourse"  >Add a course</Nav.Link> : null}
        {props.role === "admin" ? <Nav.Link href="/admin/accounts" >Manage accounts</Nav.Link> : null}
        {

          props.role === "admin" ? <Nav.Link href="/category/edit" >edit categories</Nav.Link> : null

        }
        <Nav.Link href="/" onClick={() =>{

          localStorage.clear()

        }} >LogOut</Nav.Link>
      </Nav> }
      
    </Navbar.Collapse>
    
    </Container>
  </Navbar>
  )
}