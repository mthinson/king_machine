import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';


function Layout() {
    const toggleDisplay = () =>{
        if(localStorage.getItem('loggedIn')){
            return(
                <div>
                    <Routes>
                      <Route path="/profile" element={<Profile />} />  
                      <Route path="/login" element={<Login />} /> 
                    <Route path="/" element={<Login />} /> 
                    </Routes>    
            </div>
            )
           
        }else{
            return(
                
            <div>
                
                  <Routes>
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />  
                  </Routes>  
            </div>
            )
        } 
    }

    return(
        <div>
         
            {toggleDisplay()}
           
        </div>
    )
}

export default Layout;