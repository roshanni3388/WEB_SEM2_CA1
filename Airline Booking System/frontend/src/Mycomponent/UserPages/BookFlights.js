import { Image } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookFlights = () => {

    const location = useLocation();
    const { flightId } = location.state ? location.state : { flightId: "" };
    const [flight, setFlight] = useState({});
    const navigate=useNavigate()
    const [passengers, setPassengers] = useState([
      { firstName: '', lastName: '', age: '', gender: '', bookingType: '' }
    ]);
  
    useEffect(() => {
      axios.get(`http://localhost:5000/admin/getFlight/${flightId}`)
        .then((result) => {
          console.log(result.data.result)
          setFlight(result.data.result)
        })
        .catch((error) => {
          console.log(error)
        })
    }, []);
  
    // Function to handle changes in passenger details inputs
    const handlePassengerChange = (index, key, value) => {
      const updatedPassengers = [...passengers];
      updatedPassengers[index][key] = value;
      setPassengers(updatedPassengers);
    };
  
    // Function to add a new passenger row
    const addPassenger = () => {
      setPassengers([...passengers, { firstName: '', lastName: '', age: '', gender: '', bookingType: '' }]);
    };
  
    // Function to remove a passenger row
    const removePassenger = index => {
      const updatedPassengers = [...passengers];
      updatedPassengers.splice(index, 1);
      setPassengers(updatedPassengers);
    };
    const [total,setTotal]=useState(0);

useEffect(() => {
    // Calculate total price for each passenger
    let totalPrice=0;
    const updatedPassengers = passengers.map(passenger => {
       totalPrice += parseFloat(passenger.bookingType === 'Business Seat Fare' ? flight?.businessSeatFare : flight?.economicSeatFare);
    });

    // Calculate total price for all passengers

    // Update state with updated passengers and total price

    setTotal(totalPrice);
    console.log(total)
    console.log(totalPrice)
}, [passengers,passengers.bookingType]);
 
const HendleSubmit=(e)=>{
  e.preventDefault();
  for(let i=0;i<passengers.length;i++){
    if(!passengers[i].firstName || !passengers[i].lastName || !passengers[i].gender || !passengers[i].bookingType ||  !passengers[i].age ){
      return alert(`Please Fill All filds Of Passenger Index Number ${i+1}`)
    }
  }

  if(!passengers || !total || !flightId ){
    return alert("Please Fill All filds")
  }

  axios.post(`http://localhost:5000/user/createBooking`,{passengers,total,flightId})
  .then((result)=>{
     if(result.data.message==="Booking SuccessFully Created"){
      alert('Booking Successfully Created');
      navigate("/paymentPage")
     }
     else{
      alert('Booking Successfully Not Created');
     }
  })
  .catch((error)=>{
   console.log(error)
   alert("Booking Successfully Not Created Due To Backend!");
  })
}

return (
    <div style={{paddingTop:"20vh" ,backgroundColor:"gray" ,minHeight:"100vh"}} >
     

    <div style={{display:"flex", borderWidth:"30px",padding:"40px", flexDirection:"row" , backgroundColor:"white",justifyContent:"space-between" }}>
        <div>
        <h3 style={{marginTop:"50px",marginBottom:"50px"}}> Flight Details </h3>
        <Image
                          style={{padding:"5px"}}
                          boxSize='100px'
                          src={`http://localhost:5000/images/${flight?.pic}`}
                          alt={flight?.companyName}
                          />
        </div>
        <div style={{marginTop:"110px"}} >
            <div style={{display:"flex", flexDirection:"row" , justifyContent:"space-evenly" }} >
            <h6 style={{padding:"5px"}} >{flight?.companyName } <span> : </span></h6>
            <h6 style={{padding:"5px"}} >{flight?.flightName}</h6>
            </div>
            <div style={{display:"flex", flexDirection:"row" , justifyContent:"space-evenly" }} >
            <h6 style={{padding:"5px"}} >Flight Number <span> : </span></h6>
            <h6 style={{padding:"5px"}} >{flight?.flightNumber}</h6>
            </div>
            <div style={{display:"flex", flexDirection:"row" , justifyContent:"space-evenly" }} >
            <h6 style={{padding:"5px"}} >From City <span> : </span></h6>
            <h6 style={{padding:"5px"}} >{flight?.fromCity}</h6>
            </div>
            <div style={{display:"flex", flexDirection:"row" , justifyContent:"space-evenly" }} >
            <h6 style={{padding:"5px"}} >Business Seat Fare <span> : </span></h6>
            <h6 style={{padding:"5px"}} >{flight?.businessSeatFare}</h6>
            </div>
            <div style={{display:"flex", flexDirection:"row" , justifyContent:"space-evenly" }} >
            <h6 style={{padding:"5px"}} >Economic Seat Fare <span> : </span></h6>
            <h6 style={{padding:"5px"}} >{flight?.economicSeatFare}</h6>
            </div>
        </div>
    </div>
    <div style={{display:"flex",borderWidth:"30px",padding:"40px",flexDirection:"column", backgroundColor:"white" ,justifyContent:"space-around"}}>
     <div style={{ width:"100%"}}>
        <h3 style={{marginTop:"50px",marginBottom:"50px"}}>Enter Passange Details</h3>
    </div>

    <div style={{ width:"100%"}}>
    <table style={{ width:"100%"}} >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Booking Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger, index) => (
            <tr key={index}>
              <td ><input style={{borderColor:"black" ,borderWidth:"5px"}} type="text" value={passenger.firstName} onChange={e => handlePassengerChange(index, 'firstName', e.target.value)} /></td>
              <td><input style={{borderColor:"black" ,borderWidth:"5px"}} type="text" value={passenger.lastName} onChange={e => handlePassengerChange(index, 'lastName', e.target.value)} /></td>
              <td><input style={{borderColor:"black" ,borderWidth:"5px"}} type="text" value={passenger.age} onChange={e => handlePassengerChange(index, 'age', e.target.value)} /></td>
              <td><select style={{borderColor:"black" ,borderWidth:"5px"}} type="text" value={passenger.gender} onChange={e => handlePassengerChange(index, 'gender', e.target.value)} > 
               <option  selected >Select Option</option>
                 <option value={'Male'} >Male </option>
                <option value={'Female'} >Female</option>
                <option value={'Other'} selected >Other</option>
                
              </select> </td>
              <td><select style={{borderColor:"black" ,borderWidth:"5px"}} type="text" value={passenger.bookingType} onChange={e => handlePassengerChange(index, 'bookingType', e.target.value)} > 
              <option selected >Select Option</option>
                <option value={'Economiy Seat Fare'} selected >Economy Class </option>
                <option value={'Business Seat Fare'} >Business Class </option>
               </select></td>
              <td><button style={{borderColor:"black",backgroundColor:"blueviolet" ,borderWidth:"5px"}} onClick={() => removePassenger(index)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ width:"100%",display:"flex",justifyContent:'center' }}>
    <button onClick={addPassenger} style={{ width:"25%", padding:"10px" ,margin:"30px" , backgroundColor:"blueviolet"}} > Add Passenger </button> 

    </div>

   
    </div>
    <div style={{display:"flex",borderWidth:"30px",padding:"40px",flexDirection:"column", backgroundColor:"white" ,justifyContent:"space-around"}}>
     <div style={{ width:"100%"}}>
        <h3 style={{marginTop:"50px",marginBottom:"50px"}}>Enter Other Details</h3>
    </div>

    <div style={{ width:"100%"}}>
          <input  style={{borderColor:"black" ,borderWidth:"5px" ,padding:"10px" ,margin:"10px"}} type='text' placeholder='Mobile Number' ></input>
          <input style={{borderColor:"black" ,borderWidth:"5px" ,padding:"10px" ,margin:"10px"}} type='text' placeholder='Destination City Name' ></input>
          <input style={{borderColor:"black" ,borderWidth:"5px" ,padding:"10px" ,margin:"10px"}} type='text' placeholder='Destination Pincode' ></input>
          <input style={{borderColor:"black" ,borderWidth:"5px" ,padding:"10px" ,margin:"10px"}} type='text' placeholder='Destination Country' ></input>
    </div>
    <div style={{ width:"100%",display:"flex",justifyContent:'space-between' }}>
        <h4 style={{padding:"10px" ,margin:"10px" , backgroundColor:"blueviolet"}} >Total Price : {total} </h4>
        <button onClick={HendleSubmit} style={{padding:"10px" ,margin:"10px" , backgroundColor:"blueviolet"}} > Submit </button> 
    </div>

    </div>

    </div>
  );
};

export default BookFlights;