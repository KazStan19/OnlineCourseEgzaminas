import axios from "axios"


class CourseServices {

    addCourse = (role,user,category,desc,title,price) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`


        axios.post('http://localhost:5000/api',{userRole:role,user:user,categorie:category,desc:desc,title:title,price:price},{

            "headers":{

                authorization: token,


            }
            
        
        })
        .then(()=>{

            window.location.replace('/')
            return

        })

    }
    updateCourse = () =>{

        

    }
    getCourses = () =>{

        return axios.get(`http://localhost:5000/api`)
        .then(async(response) =>{

            return response.data

        })      

    }
    deleteCourse = (id,userRole) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
        
        console.log(token)

        axios.delete(`http://localhost:5000/api/${id}`,{

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

    updateCourse = (id,userRole,category,desc,title,price) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`

        axios.put(`http://localhost:5000/api/${id}`,{userRole:userRole,categorie:category,desc:desc,title:title,price:price},{

            "headers":{

                authorization: token,


            }
            
        
        }).then(() =>{

            window.location.reload()

        })

    }

}

export default new CourseServices