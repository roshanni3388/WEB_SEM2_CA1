import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from 'axios';

import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    border-radius: 5px;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
`;

const InputBox = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
`;

const Input = styled.input`
  height: 45px;
  width: 100%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;

  &:focus, &:valid {
    border-color: #9b59b6;
  }
`;

const GenderDetails = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Category = styled.div`
  display: flex;
  width: 80%;
  margin: 14px 0;
  justify-content: space-between;
`;



const AddFlight = () => {
    // {economicSeatFare,economicSeats,businessSeatFare,businessSeats,days,
    //     destinationCityDTime,destinationCityATime,fromCityDTime,fromCityATime,
    //     destinationCity,fromCity,airportName,flightNumber,flightName,companyName,pic}
   
    const [economicSeatFare,seteconomicSeatFare]=useState()
    const [economicSeats,seteconomicSeats]=useState()
    const [businessSeatFare,setbusinessSeatFare]=useState()
    const [businessSeats,setbusinessSeats]=useState()
    const [days,setdays]=useState()
    const [destinationCityDTime,setdestinationCityDTime]=useState()
    const [destinationCityATime,setdestinationCityATime]=useState()
    const [fromCityDTime,setfromCityDTime]=useState()
    const [fromCityATime,setfromCityATime]=useState()
    const [destinationCity,setdestinationCity]=useState()
    const [fromCity,setfromCity]=useState()
    const [airportName,setairportName]=useState()
    const [flightNumber,setflightNumber]=useState()
    const [flightName,setflightName]=useState()
    const [companyName,setcompanyName]=useState()
    const [pic,setPic]=useState([])
    const navigate=useNavigate()
  
    // Function to handle form submission
      const handleSubmit = async (event) => {
          event.preventDefault();
  
          if(!pic || !economicSeatFare|| !economicSeats ||  !businessSeatFare ||  
            !businessSeats || !days || !destinationCityDTime || !destinationCityATime 
             || !fromCityDTime || !fromCityATime || !destinationCity || 
             !fromCity ||!airportName || !flightNumber || !flightName || !companyName ){
            
              alert("Please fill all filds");
            return
          }
        
          const formData = new FormData();
          formData.append('economicSeatFare', economicSeatFare);
          formData.append('economicSeats', economicSeats);
          formData.append('pic', pic); // Pass the file object directly
          formData.append('businessSeatFare', businessSeatFare);
          formData.append('businessSeats', businessSeats);
          formData.append('days', days);
          formData.append('destinationCityDTime', destinationCityDTime);
          formData.append('destinationCityATime', destinationCityATime);
          formData.append('fromCityDTime', fromCityDTime);
          formData.append('fromCityATime', fromCityATime);
          formData.append('destinationCity', destinationCity);
          formData.append('fromCity', fromCity);
          formData.append('airportName', airportName);
          formData.append('flightNumber', flightNumber);
          formData.append('flightName', flightName);
          formData.append('companyName', companyName);

          console.log(formData);
        
          axios.post(`http://localhost:5000/admin/createFlight`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          .then((result) => {
              console.log(result.data.message);
              if (result.data.message==="Flight SuccessFully Created") {
                  navigate("/viewAllFlight");
                  alert("Flight Successfully Created");
              } else {
                  alert("Something error");
              }
          })
          .catch((err) => {
              console.error(err);
              alert("Something went wrong");
          });
        }
  
  
      const handleImageChange = (event) => {
          const file = event.target.files[0];
          setPic(file);
      };
      
    //   const hendlClick2 = (e) => {
    //     setGender(e.target.value);
    // }


  return (
    <div style={{display:"flex", flexDirection:"column",justifyContent:"center" ,paddingTop:"20vh" ,backgroundColor:"gray"}} >
         <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="mb-5">Add Flight</h1>         
        </div>  
       <center>
      <Container  >
      <Title>Flight</Title>
      <div className="content">
        <form action="#">
          <UserDetails>
            <InputBox>
              <span className="details">Company Name</span>
              <Input type="text" placeholder="Enter your company name" onChange={(e)=>setcompanyName(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Flight Name</span>
              <Input type="text" placeholder="Enter your flight name" onChange={(e)=>setflightName(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Flight Number</span>
              <Input type="text" placeholder="Enter your flight number" onChange={(e)=>setflightNumber(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Airport Name</span>
              <Input type="text" placeholder="Enter your airport name" onChange={(e)=>setairportName(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">From City</span>
              <Input type="text" placeholder="Enter your from city name" onChange={(e)=>setfromCity(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Destination City</span>
              <Input type="text" placeholder="Enter your destination city name" onChange={(e)=>setdestinationCity(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">From City Arrival Time</span>
              <Input type="time" placeholder="Enter your from city arrival time" onChange={(e)=>setfromCityATime(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">From City Departure Time</span>
              <Input type="time" placeholder="Enter your city departure time" onChange={(e)=>setfromCityDTime(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Destination City Arrival Time</span>
              <Input type="time" placeholder="Enter destination city arrival time" onChange={(e)=>setdestinationCityATime(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Destination City Departure Time</span>
              <Input type="time" placeholder="Enter destination city departure time" onChange={(e)=>setdestinationCityDTime(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Total Days</span>
              <Input type="days" placeholder="Enter total Days" onChange={(e)=>setdays(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Total Business Seats</span>
              <Input type="text" placeholder="Enter total business Seats" onChange={(e)=>setbusinessSeats(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Business Seat Fare </span>
              <Input type="text" placeholder="Enter  business seats fare" onChange={(e)=>setbusinessSeatFare(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Total Economy Seats  </span>
              <Input type="text" placeholder="Enter total Economy seats " onChange={(e)=>seteconomicSeats(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Economy Seat Fare </span>
              <Input type="text" placeholder="Enter total Economy seats fare" onChange={(e)=>seteconomicSeatFare(e.target.value)} required />
            </InputBox>
            <InputBox>
              <span className="details">Image</span>
              <Input type="file"  onChange={handleImageChange} required />
            </InputBox>
          </UserDetails>
      
        </form>
        <div  style={{ display:"flex" , justifyContent:"center"}} >

    <button style={{backgroundColor:"GrayText",margin:'20px',height:"40px",width:"50%"  }}  
    onClick={handleSubmit}
    type='button'
      >
    Submit
</button>

</div>
      </div>
    </Container>
       </center>
    </div>
  );
}
export default AddFlight;
