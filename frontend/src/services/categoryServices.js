import axios from "axios"


class CategoryServicas {

    addCategory = (name,userRole) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`

        axios.post('http://localhost:5000/category',{name:name,userRole:userRole},{

            headers:{

                authorization: token,

            }

        }).then(() =>{

            window.location.reload()

        })

    }
    updateCategory = (id,userRole,name) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`


        axios.put(`http://localhost:5000/category/${id}`,{userRole:userRole,name:name},{

            "headers":{

                authorization: token,

            }
            
        
        }).then(() =>{

            window.location.reload()

        })

    }
    getCategories = () =>{

        return axios.get(`http://localhost:5000/category`)
        .then((response) =>{
            return response.data
        })      

    }
    deleteCategory = (id,userRole) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`

        axios.delete(`http://localhost:5000/category/${id}`,{

            "headers":{

                authorization: token,


            },
            "data":{

                userRole:userRole

            }
        
        }).then(() =>{

            window.location.reload()

        })

    }

}

export default new CategoryServicas