import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Header from '../Header/Header';

function Layout() {
    const toggleDisplay = () =>{
        if(localStorage.getItem('loggedIn')){
            return(
                <div>
                  <Header />
                    <Routes>
                      <Route path="/profile" element={<Profile />} />   
                    </Routes>    
            </div>
            )
           
        }else{
            return(
                
            <div>
                <Header />
                  <Routes>
                    <Route path="/login" element={<Login />} /> 
                    <Route path="*" element={<Login />} />
                  </Routes>  
            </div>
            )
        } 
    }

    return(
        <div>
          {/* <Header /> */}
            {toggleDisplay()}
           
        </div>
    )
}

export default Layout;