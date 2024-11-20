import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FrontContactPage = () => {
    const [fname,setfname]=useState()
    const [message,setmessage]=useState()
    const [email,setemail]=useState()
    const [subject,setsubject]=useState()
    const navigate=useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here, e.g., sending data to backend
        if(!fname || !message || !email || !subject){
            return alert("Please Fill All filds ")
        }
      
        axios.post(`http://localhost:5000/user/createContact`,{fname,email,subject,message})
        .then((result)=>{
           if(result.data.message==="Contact SuccessFully Created"){
            alert("Feedback SuccessFully Send");
            navigate('/userdashBoard')
   
           }
           else{
            alert("Feedback SuccessFully Not Send");
           }
        })
        .catch((error)=>{
          console.log(error)
        })

    };
