import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import userServices from '../../../services/userServices'
import { LoadingPage } from '../loadingPage'
import { UpadateAcc } from './UpdateAcc'

export const AccTable = (props) => {

const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)
const [updateToggle, setUpdateToggle] = useState(false)
const [updateUser, setUpdateUser] = useState('')

  useEffect(() => {
    setLoading(true)
    userServices.getUsers(props.role).then(item =>{
      setLoading(false)
      setUsers(item)

    })
    
  }, [])

  const deleteHandler = (e) =>{

    userServices.deleteUser(e.target.id,props.role)

  }

  return(loading === true ? <LoadingPage/> : updateToggle === false ? <Table className='text-center rounded' variant="light" striped bordered hover>
  <thead>
    <tr>
      <th>User First Name</th>
      <th>User Last Name</th>
      <th>User email</th>
      <th>role</th>
      <th>boughtCourses</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody >
    
    {users.map(userItem => {

      return(<tr key={userItem._id}>

        <td>{userItem.firstName}</td>
        <td>{userItem.lastName}</td>
        <td>{userItem.email}</td>
        <td>{userItem.role}</td>
        <td><ul className="list-group">{userItem.boughtCourses.map(course =>

            <li className="list-group-item" key={course._id}>{course.title}</li>

        )}</ul></td>
        <td><button className='btn btn-success' onClick={() => {setUpdateToggle(!updateToggle);setUpdateUser(userItem) }}>edit</button></td>
        <td><button id={userItem._id} onClick={deleteHandler} className='btn btn-danger'>delete</button></td>
      </tr>)

    })}

    <tr>

    </tr>
   
  </tbody>
</Table>:<UpadateAcc role={props.role} user={updateUser}/>
  )
}
