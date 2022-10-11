import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Header() {

  //sets state to user input
const [signInUser, setSignInUser] = useState({id:'', password:''})
const navigate = useNavigate();

const changeHandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value;

  const tempSignIn = {...signInUser};
  tempSignIn[name] = value;
  setSignInUser(tempSignIn)
}

const signInSubmitHandler = () =>{
  axios.post('http://localhost:8080/login', signInUser).then(response =>{
    localStorage.setItem("loggedIn", response.data.id);
    console.log(response);
    navigate("/profile")
    console.log("sign in success")

  }).catch(error =>{
    console.log("error signing in" + error)
  })
}

const signOut = () =>{
  localStorage.clear();
  navigate("/login")
}

const toggleDisplay = () =>{
  if(localStorage.getItem('loggedIn')){
    return(
        <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/login">Home</Link>
          </li>
        </ul>
        <form className="d-flex">        
          <button onClick={signOut} className="btn btn-outline-success" type="button">Logout</button>
        </form>
      </div>
    )
 }else{
     return(
        <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item text-white">
            <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
         
        </li>
        </ul>
        

        <form className="d-flex sign-in">
          <input onChange={changeHandler} className="form-control me-2" value={signInUser.id} name="id" type="id" placeholder="id" aria-label="id" />
          <input onChange={changeHandler} className="form-control me-2" value={signInUser.password} name="password" type="password" placeholder="Password" aria-label="Password" />
          <button onClick={signInSubmitHandler} className="btn btn-outline-success sign-in-btn" type="button">Login</button>
        </form>
      </div>
     )
 }
}
  return (
    <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb-5">
     <div className="container-fluid">
     <Link className="navbar-brand" to="/">King Machine <strong className="all">Dashboard</strong></Link>
       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
         {toggleDisplay()}
     </div>
   </nav>
 </header>
  )

}

export default Header;