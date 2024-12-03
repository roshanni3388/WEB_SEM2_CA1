import { Button, Image, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

function ViewUserFlights() {
    const [data,setData] =useState([])
    const [record,setRecord] =useState([])
    const navigate=useNavigate()
    const location=useLocation()
    const {destinationCity,fromCity}=location.state?location.state:{destinationCity:"",fromCity:""}
    

    const columns = [
        {
            name: 'Image',
            selector:(row )=> (
            <>
                <Image
                    borderRadius='full'
                    boxSize='100px'
                    src={`http://localhost:5000/images/${row.pic}`}
                    alt={row.fname}
                    style={{padding:'5px'}}
                />
            </>
       ),
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Flight Name',
            selector: row => row.flightName,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Flight Number',
            selector: row => row.flightNumber,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'AirPort Name',
            selector: row => row.airportName,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Company Name',
            selector: row => row.companyName,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
       
        },
     
        {
            name: 'Details',
            cell: (row) => (
            <div style={{ display:"flex", flexDirection:"row" }} > 
                <button style={{backgroundColor:"GrayText" ,padding:"20px"  }}  onClick={()=>HendleClick(row._id)} type='button'> View </button>

            </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Book',
            cell: (row) => (
            <div style={{ display:"flex", flexDirection:"row" , padding:"10px"}} > 
                <button style={{backgroundColor:"GrayText" ,padding:"20px"  }}  onClick={()=>handleSubmit(row._id)} type='button'> Book Now</button>
            </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    
   useEffect(()=>{
   
    axios.get(`http://localhost:5000/user/searchFlight?destinationCity=${destinationCity}&fromCity=${fromCity}`)
      .then((response) => {
        console.log(response.data.result);
        setData(response.data.result);
        setRecord(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching flights:', error);
      });
   },[])
    
   const DeleteItem =(id)=>{
    const confirmed=window.confirm(
        "Are you sure you want to delete this Flight ?"
       );
     
       if(confirmed){
        axios.delete(`http://localhost:5000/admin/deleteFlight/${id}`)
        .then((result)=>{
            console.log(result.data.message)
            if(result.data.message==="Flight SuccesFully Deleted"){
              setRecord(record.filter((p)=> p._id!==id )); 
              setData(record)
            }
            else{
              alert("Flight not delete");
            }
        })
        .catch((error)=>{
        alert("Flight not delete");
          console.log(error)
        })
       }
       
}

const [showNumber, setShowNumber] = useState({});


const toggleNumberVisibility = (id) => {
    setShowNumber((prevState) => ({
    ...prevState,
    [id]: !prevState[id],
  }));
};
const [showUsername, setShowUsername] = useState({});

const toggleUsernameVisibility = (id) => {
        setShowUsername((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
};

const HendleClick=(id)=>{
    navigate('/viewFlightDetails',{state:{flightId:id}})
 }
      

const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const newdata = data.filter(row => {
        const firstNameMatch = row.companyName.toLowerCase().includes(searchTerm);
        const lastNameMatch = row.flightNumber.toLowerCase().includes(searchTerm);
        const emailMatch = row.flightName.toLowerCase().includes(searchTerm);
        const countryMatch = row.airportName.toLowerCase().includes(searchTerm);
    
        return firstNameMatch || lastNameMatch || emailMatch || countryMatch ;
    });
    setRecord(newdata);
 } 

 const handleSubmit = async (id) => {
  
    navigate("/bookFlights",{state:{flightId:id}})

  }

  return (
     
      <div  style={{paddingTop:"20vh" ,backgroundColor:"gray" ,minHeight:"100vh"}} > 
         <div  >
         <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-5">View Search Flights</h1>
                    <Input style={{backgroundColor:"white",width:"25%",marginBottom:"10px",marginRight:"-70%" }} placeholder='Search' onChange={handleFilter}  /> 
        </div>  
         <DataTable columns={columns} data={record} style={{padding:"30vh" }} pagination />
         </div>
      </div>


  )
}

export default ViewUserFlights