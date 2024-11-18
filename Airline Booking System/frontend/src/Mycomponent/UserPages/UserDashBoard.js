import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserDashBoard() {
    const [fromCity,setfromCity]=useState()
    const [destinationCity,setdestinationCity]=useState()
    const navigate=useNavigate()

    const handleSubmit=()=>{
        if(!fromCity || !destinationCity){
         return alert("Please File Both City Name")
        }
        navigate('/viewUserFlights',{state:{fromCity:fromCity,destinationCity:destinationCity}})
    }

    const handleSubmit1=()=>{
        navigate('/userDestinationPage')
    }
    const handleSubmit2=()=>{
        navigate('/userContact')
    }
    const handleSubmit3=()=>{
        navigate('/viewUserBookings')
    }

    return (
        <div>
           <div  >
                <section className="banner-area relative" style={{paddingTop:"5vh" ,minHeight:"100vh"}}>
                <div className="overlay overlay-bg"></div>
                <div className="container" style={{padding:"12vh"}}>
                    <div className="row fullscreen align-items-center justify-content-between">
                        <div className="col-lg-6 col-md-6 banner-left">
                            <h6 className="text-white">Away from monotonous life</h6>
                            <h1 className="text-white">Magical Travel</h1>
                            <p className="text-white">
                            This headline emphasizes the ease and speed of booking flights on your website. It suggests that users can quickly and effortlessly book their dream destinations without any hassle or complication.
                            </p>
                            <button onClick={handleSubmit1} style={{margin:"3px"}} className="primary-btn text-uppercase">Destinations</button>
                            <button onClick={handleSubmit2}  style={{margin:"3px"}} className="primary-btn text-uppercase">Feedback</button>
                            <button onClick={handleSubmit3}  style={{margin:"3px"}} className="primary-btn text-uppercase">MyBookings</button>
                        </div>
                        <div className="col-lg-4 col-md-6 banner-right">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="flight" role="tabpanel" aria-labelledby="flight-tab">
                                    <form className="form-wrap" >
                                        <lable ><h3 style={{padding:"20px"}}>From City </h3></lable>
                                        <input type="text" onChange={(e)=>setfromCity(e.target.value)} className="form-control" placeholder="name"  />
                                        <lable> <h1>To</h1> </lable>
                                        <lable> <h3  style={{padding:"20px"}}>Destination City </h3> </lable>
                                        <input type="text" onChange={(e)=>setdestinationCity(e.target.value)} className="form-control"  placeholder="name" />
                                        <button onClick={handleSubmit} className="primary-btn text-uppercase"> Search flights </button>
                                    </form>
                                </div>
                              
                             
                            </div>
                        </div>
                    </div>
                </div>
                </section>
                </div>
        </div>
      )
    }
    
    export default UserDashBoard