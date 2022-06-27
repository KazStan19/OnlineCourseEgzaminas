import axios from "axios"
import {useNavigate} from 'react-router-dom'



class UserServices {

    

    registerUser = (firstName,lastName,email,password,userRole,adminPass) =>{
        axios.post('http://localhost:5000/user',{firstName:firstName,lastName:lastName,email:email,password:password,role:userRole,adminPass:adminPass})
        .then(()=>{

            window.location.replace('/login')

        })
        
    }
    getUsers = (userRole) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`

        return axios.post(`http://localhost:5000/user/all`,{userRole:userRole},{

            "headers":{

                authorization: token,

            }
        
        }).then((response) =>{

            return response.data

        })      

    }
    loginUser = (email,password) =>{

       return axios.post('http://localhost:5000/user/login',{email:email,password:password})
        .then((response) =>{

            window.localStorage.setItem("user", JSON.stringify(response.data));
            window.location.replace('/')
            return 
            
        })
        
    }

    updateUser = (id,userRole,updateduserRole,firstName,lastName,email) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`

        axios.put(`http://localhost:5000/user/${id}`,{userRole:userRole,firstName:firstName,lastName:lastName,email:email,role:updateduserRole},{

            "headers":{

                authorization: token,

            }
            
        }).then(() =>{

            window.location.reload()

        })

    }

    deleteUser = (id,userRole) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`

        axios.delete(`http://localhost:5000/user/${id}`,{

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

    addCourse = (id,boughtCourseID) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`

        axios.put(`http://localhost:5000/user/course/${id}`,{courseId:boughtCourseID},{

            "headers":{

                authorization: token,

            }
        
        }).then((item) =>{

            let user = JSON.parse(localStorage.getItem('user'))
            user.boughtCourses=item.data
            user = JSON.stringify(user)
            localStorage.setItem('user',user)
           window.location.reload()

        })

    }
    deleteCourse = (id,boughtCourseID) =>{

        let token = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`

        axios.put(`http://localhost:5000/user/course/delete/${id}`,{courseId:boughtCourseID},{

            "headers":{

                authorization: token,

            }
        
        }).then((item) =>{
            let user = JSON.parse(localStorage.getItem('user'))
            user.boughtCourses=item.data
            user = JSON.stringify(user)
            localStorage.setItem('user',user)
           window.location.reload()

        })
    
    }

}

export default new UserServices