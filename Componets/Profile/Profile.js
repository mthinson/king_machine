import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from "axios";
import pic1 from "../images/profileStock.jpg";
import Header from '../Header/Header';
import Clock from '../Clock/Clock';

function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {
   const params = {
    id:localStorage.getItem('loggedIn')
   }
    axios.get('http://localhost:8080/findUser', {params})
    .then(response =>{
      setUser(response.data);

    }).catch(error =>{
      console.log(error + "error in user retrieval")
    })
  }, []
  )

  const overtime = () =>{
    let overtime = user.hours - 40;
    if(overtime < 1){
       overtime = 0;
    }
    return overtime;
  }
  
  const pto = () =>{
    let timeOff = user.hours * .02;
    return timeOff;
  }
  const addTime = () =>{
    const item = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      hours: user.hours,
      rate: user.rate,
      startTime: clockIn()
    }

    axios.post("http://localhost:8080/clockIn", item).then(response =>{
      console.log("saved data " + item.startTime)
      localStorage.setItem(clockIn, "clock out")
      console.log("success clock in" )
  }).catch(error =>{
      console.log("error inside clock in: " + error)
  })
  }

  const clockIn = () =>{
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const total = hours * 60 + minutes;
    console.log(total);
    return total;
  }




  const clockOut = () =>{
    const item = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      hours: user.hours + ((clockIn() - user.startTime) / 60),
      rate: user.rate,
      
    }
    axios.post("http://localhost:8080/clockIn", item).then(response =>{
      console.log("saved data " + item.startTime)
      localStorage.setItem(clockIn, "clock in")
      console.log("success clock out" )
  }).catch(error =>{
      console.log("error inside clock out: " + error)
  })
  }


  const toggleDisplay = () =>{
    if(localStorage.getItem(clockIn,"clock out")){
      return(
        <div className='bodyContainer mt-5'> 
        <Header />
       <div className='welcomeBanner display-3 mt-3 text-center'>Welcome {user.firstName}</div>
    
       <Clock/>
       <button type="button" className="btn btn-primary" onClick={clockOut}>Clock out</button>
    
       <div className=' infoContainer border'>
         <div className='pic'>
           <img className='profilePic' src={pic1} alt="basic blue background with outline of human filled with grey"/>
         </div>
         <div className='info'>
           <h5 className=''>First Name: {user.firstName}</h5>
           <h5 className=''>Last Name: {user.lastName}</h5>
           <h5 className=''>Email: {user.firstName}.{user.lastName}@KingMachine.com</h5>
         </div>
    
       </div>
    
       <div className='wageContainer mt-3 border'>
         <div className='hours'>
           <h6> Hours Worked: {user.hours}</h6>
           <h6>Overtime: {overtime()}</h6>
         </div>
         <div className='pto'>
           <h6>Paid Time Off: {pto()}</h6>
           <h6 className='lolTimeOff'>Request time off</h6>
         </div>
    
       </div>
    
       <div className='experienceContainer'>
       <h6>Experience and Certification</h6>
       <p>Machine Programming</p>
       <p>Button pushing ++</p>
       <p>Set up </p>
       </div>
    
       </div>
      )
      
    }else {
      return(
        <div className='bodyContainer mt-5'> 
    <Header />
   <div className='welcomeBanner display-3 mt-3 text-center'>Welcome {user.firstName}</div>

   <Clock/>
   <button type="button" className="btn btn-primary" onClick={addTime}>Clock in</button>

   <div className=' infoContainer border'>
     <div className='pic'>
       <img className='profilePic' src={pic1} alt="basic blue background with outline of human filled with grey"/>
     </div>
     <div className='info'>
       <h5 className=''>First Name: {user.firstName}</h5>
       <h5 className=''>Last Name: {user.lastName}</h5>
       <h5 className=''>Email: {user.firstName}.{user.lastName}@KingMachine.com</h5>
     </div>

   </div>

   <div className='wageContainer mt-3 border'>
     <div className='hours'>
       <h6> Hours Worked: {user.hours}</h6>
       <h6>Overtime: {overtime()}</h6>
     </div>
     <div className='pto'>
       <h6>Paid Time Off: {pto()}</h6>
       <h6 className='lolTimeOff'>Request time off</h6>
     </div>

   </div>

   <div className='experienceContainer'>
   <h6>Experience and Certification</h6>
   <p>Machine Programming</p>
   <p>Button pushing ++</p>
   <p>Set up </p>
   </div>

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

export default Profile