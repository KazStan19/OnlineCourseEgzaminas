import {BrowserRouter,Routes,Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Register from "./components/register/Register";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderNav } from "./components/HeaderNav";
import { ErrorPage } from "./components/ErrorPage";
import { useEffect, useState } from "react";
import { LoadingPage } from "./components/loadingPage";
import { AddCourse } from "./components/lecturer/addCourse";
import { ListCategory } from "./components/admin/listCategory";
import { AccTable } from "./components/account_management/AccTable";



function App() {

  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [loginState, setLoginState] = useState(false)

  useEffect(() => {

    let checkUser = JSON.parse(localStorage.getItem('user'))
    setLoading(true)

    if(checkUser !== null){

      setLoginState(true)
      setUser(checkUser)
    }
    setLoading(false)
  }, [])

  return (
    <BrowserRouter >
      
      <HeaderNav role={user.role} state={loginState}/>

      <Routes> 

        <Route exact path="/" element={loading === false ? <LandingPage loginState={loginState} user={user}/> : <LoadingPage/>}/>
        <Route path="/filtered/:categoryID" element={loading === false ? <LandingPage loginState={loginState} user={user}/> : <LoadingPage/>}/>
        <Route path="/login" element={<Login state={loginState} setUser={setUser}/>}/>
        <Route path="/register" element={<Register state={loginState}/> }/>
        <Route path="/addCourse"  element={user.role === 'admin' || user.role === 'lecturer'? <AddCourse userId={user._id} role={user.role}/>:null}/>
        <Route path="/category/edit"  element={user.role === 'admin' ? <ListCategory role={user.role}/> : null}/>
        <Route path="/admin/accounts"  element={user.role === 'admin' ? <AccTable role={user.role}/> : null}/>
        <Route path="/*" element={<ErrorPage/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
