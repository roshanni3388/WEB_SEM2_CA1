import { Button, Image, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ViewDestination() {
    const [data,setData] =useState([])
    const [record,setRecord] =useState([])
    const navigate=useNavigate()
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
            name: 'Country Name',
            selector: row => row.countryName,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
       
        },
        {
            name: 'City Name',
            selector: row => row.cityName,
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
        // {
        //     name: 'Email',
        //     selector: (row )=> (
              
        //              <>
        //         {showUsername[row._id] ? row.email : "****"}
        //             <FontAwesomeIcon
        //               icon={showUsername[row._id] ? faEyeSlash : faEye}
        //               className="field-icon toggle-password-2 btn btn-primary"
        //               onClick={() => toggleUsernameVisibility(row._id)}
        //               style={{margin:'10px'}}
        //             />
        //              </>
           
        //     ),
        //     sortable:true,
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        // },
        // {
        //     name: 'Mobile Number',
        //     selector: row => (
        //         <>
        //         {showNumber[row._id] ? row.contact : "****"}
        //             <FontAwesomeIcon
        //               icon={showNumber[row._id] ? faEyeSlash : faEye}
        //               className="field-icon toggle-password-2 btn btn-primary"
        //               onClick={() => toggleNumberVisibility(row._id)}
        //               style={{margin:'10px'}}
        //             />
        //         </>
        //     ),
        //     sortable:true,
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        // },
        {
            name: 'Action',
            cell: (row) => (
                <div>
                <span style={{margin:"10px"}} onClick={()=>HendleClick(row)} ><FontAwesomeIcon icon={faPenToSquare} /></span>   
                <span style={{margin:"10px"}}  onClick={()=>DeleteItem(row._id)} ><FontAwesomeIcon icon={faTrash} /></span>
            </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    
   useEffect(()=>{
    axios.get(`http://localhost:5000/admin/getAllDestination`)
    .then((result)=>{
        console.log(result.data.result)
        setData(result.data.result)
        setRecord(result.data.result)
    })
    .catch((error)=>{
        console.log(error)
    }) 
   },[])
    
   const DeleteItem =(id)=>{
    const confirmed=window.confirm(
        "Are you sure you want to delete this Destination ?"
       );
     
       if(confirmed){
        axios.delete(`http://localhost:5000/admin/deleteDestination/${id}`)
        .then((result)=>{
            console.log(result.data.message)
            if(result.data.message==="Destination SuccesFully Deleted"){
              setRecord(record.filter((p)=> p._id!==id )); 
              setData(record)
            }
            else{
              alert("User not delete");
            }
        })
        .catch((error)=>{
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
  
const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const newdata = data.filter(row => {
        const firstNameMatch = row.airportName.toLowerCase().includes(searchTerm);
        const lastNameMatch = row.cityName.toLowerCase().includes(searchTerm);
        const emailMatch = row.countryName.toLowerCase().includes(searchTerm);
       
        return firstNameMatch || lastNameMatch || emailMatch ;
    });
    setRecord(newdata);
 } 

 const HendleClick=(row)=>{
    navigate('/updateDestination',{state:{destination:row}})
    console.log(row)
 }
      
  return (
     
      <div  style={{paddingTop:"20vh" ,backgroundColor:"gray" ,minHeight:"100vh"}} > 
         <div  >
         <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 className="mb-5">View Destinations</h1>
                    <Input style={{backgroundColor:"white",width:"25%",marginBottom:"10px",marginRight:"-70%" }} placeholder='Search By Airport ,City or,Country Name' onChange={handleFilter}  /> 
        </div>  
         <DataTable columns={columns} data={record} style={{padding:"30vh" }} pagination
		   />
         </div>
      </div>


  )
}

export default ViewDestination