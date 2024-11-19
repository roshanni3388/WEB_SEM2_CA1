import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DataHome() {
    const [fname,setfname]=useState()
    const [message,setmessage]=useState()
    const [email,setemail]=useState()
    const [subject,setsubject]=useState()
    const [fromCity,setfromCity]=useState()
    const [destinationCity,setdestinationCity]=useState()
    const navigate=useNavigate()

    const handleSubmit2=()=>{
        if(!fromCity || !destinationCity){
         return alert("Please File Both City Name")
        }
        navigate('/frontViewFlights',{state:{fromCity:fromCity,destinationCity:destinationCity}})
    }

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
    const [data2, setdata2] = useState([]);
    const [seavedata, setSaveData] = useState([]); // Your data array goes here // Your data2 array goes here
    const [currentPage2, setCurrentPage2] = useState(1);
    const [itemsPerPage2] = useState(3); // Number of items to display per page

    // Logic for displaying current data2
    const indexOfLastItem2 = currentPage2 * itemsPerPage2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
    const currentItems2 = data2.slice(indexOfFirstItem2, indexOfLastItem2);

    // Change page
    const paginate2 = pageNumber2 => setCurrentPage2(pageNumber2);

    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/getAllDestination`)
        .then((result)=>{
            console.log(result.data.result)
            setdata2(result.data.result)
            setSaveData(result.data.result)
        })
        .catch((error)=>{
            console.log(error)
        }) 
       },[])