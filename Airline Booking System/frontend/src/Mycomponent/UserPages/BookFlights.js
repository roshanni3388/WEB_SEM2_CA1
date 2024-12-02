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