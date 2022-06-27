import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import CategoryServicas from '../../services/categoryServices'
import { LoadingPage } from '../loadingPage'

export const ListCategory = (props) => {

  const [categoryName, setCategoryName] = useState('')
  const [updateId, setUpdateId] = useState('')
  const [categories, setCategories] = useState([])
  const [updateToggle, setUpdateToggle] = useState(false)
  const [loading, setLoading] = useState(true)

  const onChange = (e) => {

    setCategoryName(e.target.value)

  }

  useEffect(() => {
    setLoading(true)
    CategoryServicas.getCategories().then(item =>{
      
      setCategories(item)
      setLoading(false)

    })
  }, [])

  const onSubmit = (e) => {

    if(categoryName!=='' && categories.includes(categoryName) !== true){
    
    CategoryServicas.addCategory(categoryName,props.role)
    
  }
    else{

      if(categoryName==='') alert('Please fill in empty spaces')
      if(categories.includes(categoryName) === true) alert('This category already exists')
    }

  }
  
  const deleteHandler = (e) =>{

    CategoryServicas.deleteCategory(e.target.id,props.role)

  }

  const updateHandler = () =>{

    CategoryServicas.updateCategory(updateId,props.role,categoryName)

  }

  const updateToggleHandler = (id) =>{

    let categoryItem = ''

      setUpdateToggle(!updateToggle)
      categoryItem = categories.find(item =>{

        return item._id === id

      })
      setUpdateId(categoryItem._id)
      setCategoryName(categoryItem.name)

  }
  
  return(loading === true ? <LoadingPage/> : <Table className='text-center rounded' variant="light" striped bordered hover>
  <thead>
    <tr>
      <th>Category Name</th>
      <th>Created At</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody >
    
    {categories.map(categoryItem => {

      return(<tr key={categoryItem._id}>

        <td>{categoryItem.name}</td>
        <td>{categoryItem.createdAt}</td>
        <td>{!updateToggle ? <button onClick={() =>updateToggleHandler(categoryItem._id)} className='btn btn-success'>edit</button> : <button onClick={() =>{setUpdateToggle(!updateToggle);setCategoryName('')}} className='btn btn-dark'>cancal</button>}</td>
        <td><button id={categoryItem._id}  onClick={deleteHandler} className='btn btn-danger'>delete</button></td>
      </tr>)

    })}

    <tr>

      <td colSpan={2}><input value={categoryName} placeholder='enter category name' onChange={onChange}/></td>
      <td>{!updateToggle ? <button className='btn btn-success' onClick={onSubmit}>Add</button> : <button className='btn btn-success' onClick={updateHandler}>Update</button> }</td>
      <td><button className='btn btn-danger' onClick={()=>{setCategoryName('')}}>Clear</button></td>

    </tr>
   
  </tbody>
</Table>
  )
}