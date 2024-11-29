import { AbsoluteCenter, Center } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function DashBoard() {
    const [data,setData] =useState([])
    const [booking,setBooking] =useState([])
    const [flight,setFlight] =useState([])
    const [destination,setDestioncity] =useState([])


    useEffect(()=>{
        axios.get(`http://localhost:5000/user/getAllUser`)
        .then((result)=>{
            console.log(result.data.result)
            setData(result.data.result)
        })
        .catch((error)=>{
            console.log(error)
        }) 
       },[])

       useEffect(()=>{
        axios.get(`http://localhost:5000/user/getAllBooking`)
        .then((result)=>{
            console.log(result.data.result)
            setBooking(result.data.result)
        })
        .catch((error)=>{
            console.log(error)
        }) 
       },[])   

       useEffect(()=>{
        axios.get(`http://localhost:5000/admin/getAllFlight`)
        .then((result)=>{
            console.log(result.data.result)
            setFlight(result.data.result)
     
        })
        .catch((error)=>{
            console.log(error)
        }) 
       },[])
       
       useEffect(()=>{
        axios.get(`http://localhost:5000/admin/getAllDestination`)
        .then((result)=>{
            console.log(result.data.result)
            setDestioncity(result.data.result)
           
        })
        .catch((error)=>{
            console.log(error)
        }) 
       },[])

  return (
    <div  style={{paddingTop:"15vh" ,backgroundColor:"gray" ,minHeight:"100vh"}}>

<AbsoluteCenter   style={{width:"100%",marginBottom:"60vh" }}>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}} >
      <div class="col-xl-3 col-sm-6 py-2" style={{ width: "25%", height: "30vh", backgroundColor: "#57b960" ,transition: "background-color 0.3s", margin:"30px" }}>
             <Link to={'/viewAllUser'}>
                 <div class="card bg-success text-white h-100" style={{ backgroundColor: "#57b960", transition: "background-color 0.3s" }}>
                    <div class="card-body bg-success" style={{ backgroundColor: "#57b960",transition: "background-color 0.3s"  }}>
                                     <div class="rotate">
                                     <i class="fa fa-user fa-4x"></i>
                                  </div>
                              <Center>  <h6 class="text-uppercase">USERS</h6> </Center>
                            <Center>  <h1 class="display-4">{data.length} </h1>  </Center>
                        </div>
                     </div>
                  </Link>
                </div>

            <div class="col-xl-3 col-sm-6 py-2" style={{width:"25%",height:"30vh",backgroundColor :"#6493e3" , margin:"30px" }}  >
               <Link to={'/viewAllBooking'}  >
               <div class="card text-white bg-danger h-100">
                    <div class="card-body bg-danger" style={{backgroundColor:"#6493e3"}}>
                        <div class="rotate">
                            <i class="fa fa-list fa-4x"></i>
                        </div>
                       <center> <h6 class="text-uppercase">Bookings</h6> </center> 
                       <center>  <h1 class="display-4">{booking.length}</h1> </center>
                     
                    </div>
                </div>
               </Link>
            </div>
           
    </div>
   </AbsoluteCenter>
   
<AbsoluteCenter   style={{marginTop:"30vh",width:"100%" }}>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}} >
      <div class="col-xl-3 col-sm-6 py-2" style={{ width: "25%", height: "30vh", backgroundColor: "#179848" ,transition: "background-color 0.3s", margin:"30px" }}>
             <Link to={'/viewAllFlight'}>
                 <div class="card bg-success text-white h-100" style={{ backgroundColor: "#179848", transition: "background-color 0.3s" }}>
                    <div class="card-body bg-success" style={{ backgroundColor: "#179848",transition: "background-color 0.3s"  }}>
                    <div class="rotate">
                            <i class="fa fa-list fa-4x"></i>
                        </div>
                              <Center>  <h6 class="text-uppercase">Flights</h6> </Center>
                            <Center>  <h1 class="display-4">{flight.length} </h1>  </Center>
                        </div>
                     </div>
                  </Link>
                </div>

            <div class="col-xl-3 col-sm-6 py-2" style={{width:"25%",height:"30vh",backgroundColor :"#D69E2E" , margin:"30px" }}  >
               <Link to={'/viewDestination'}  >
               <div class="card text-white bg-danger h-100" style={{ backgroundColor: "#D69E2E", transition: "background-color 0.3s" }}>
                    <div class="card-body bg-danger" style={{backgroundColor:"#D69E2E"}}>
                        <div class="rotate">
                            <i class="fa fa-list fa-4x"></i>
                        </div>
                       <center> <h6 class="text-uppercase">Destinations</h6> </center> 
                       <center>  <h1 class="display-4">{destination.length}</h1> </center>
                     
                    </div>
                </div>
               </Link>
            </div>
           
    </div>
   </AbsoluteCenter>
   
   
    </div>
  )
}

export default DashBoard