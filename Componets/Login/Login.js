import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

function Login() {

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

      <div className='signInBody text-center'>
        <main className='form'>
           <form className=" sign-in">
            <p className='display-5'>Employee Login</p>
           <button onClick={signOut} className="btn btn-outline-success sign-in-btn" type="button">Log Out</button>
         </form>
        </main>
      </div>
    )
 }else{
     return(

      <div className='signInBody text-center'>
        <main className='form'>
           <form className=" sign-in">
            <p className='display-5'>Employee Login</p>
           <input onChange={changeHandler} className="form-control me-2 mb-3" value={signInUser.id} name="id" type="id" placeholder="Employee id" aria-label="id" />
           <input onChange={changeHandler} className="form-control me-2 mb-3" value={signInUser.password} name="password" type="password" placeholder="Password" aria-label="Password" />
           <button onClick={signInSubmitHandler} className="btn btn-outline-success sign-in-btn" type="button">Login</button>
         </form>
        </main>
      </div>
     )
 }
}
  return (

    <div>
      {toggleDisplay()}
    </div>
    
  )

}

export default Login;