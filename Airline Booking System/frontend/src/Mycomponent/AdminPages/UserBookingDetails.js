import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Center, Image, Radio, RadioGroup, Stack } from '@chakra-ui/react'
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



const UserBookingDetails = () => {
    const location=useLocation()
    const {flightId}=location.state?location.state:{flightId:""}
    const {flight}=location.state?location.state:{flight:""}

    const navigate=useNavigate()
      const handleSubmit = async (event) => {
          event.preventDefault();
          navigate("/viewAllBooking")
         
        }
  
        const [showUsername, setShowUsername] = useState(false);

        const toggleUsernameVisibility = () => {
         setShowUsername(!showUsername)
        };
        const [showNumber, setShowNumber] = useState(false);
       
        const toggleNumberVisibility = () => {
            setShowNumber(!showNumber);
        };
        const [adharNumber, setAdharShowNumber] = useState(false);
       
        const toggleAdharNumberVisibility = () => {
         setAdharShowNumber(!adharNumber);
        };
       


  return (
    <div style={{display:"flex",justifyContent:"center" ,paddingTop:"15vh" ,backgroundColor:"gray"}} >
         <Container style={{margin:"20px"}} >
     <Center style={{padding:"20px"}} > <Title>Booking Details</Title></Center>
      <div className="content">
        <form action="#">
          <UserDetails>
            <InputBox>
              <span className="details"> <h3>Image   <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <Image
                             borderRadius='full'
                             boxSize='100px'
                             src={`http://localhost:5000/images/${flight?.flightId?.pic}`}
                             alt={flight?.fname}
                             />
             </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Company Name   <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"><h5>{flight?.flightId?.companyName}</h5></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>AirPort Name   <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"><h5>{flight?.flightId?.airportName}</h5></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Flight Name   <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"><h5>{flight?.flightId?.flightName}</h5></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Flight Number<span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"><h5>{flight?.flightId?.flightNumber}</h5></span>
            </InputBox>

          
            <InputBox>
              <span className="details"> <h3>From City  <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.flightId?.fromCity}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Destination City  <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.flightId?.destinationCity}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>User Name <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.userId?.fname}  </h5>
                    </span>
            </InputBox>
            {/* <InputBox>
              <span className="details"> <h3>From City Departure Time<span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.fromCityDTime}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Destination City Arrival Time<span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.destinationCityATime}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Destination City Departure Time  <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.destinationCityDTime}  </h5>
                    </span>
            </InputBox> */}
            <InputBox>
              <span className="details"> <h3>Total Days <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.flightId?.days}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Booking Id<span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.bookingId}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Total Price <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.total}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Booking Date  <span className="details">  : </span> </h3></span>
            </InputBox>
            <InputBox>
              <span className="details"> <h5 >{flight?.date}  </h5>
                    </span>
            </InputBox>
            <InputBox>
              <span className="details"> <h3>Passenger Details  <span className="details">  : </span> </h3></span>
            </InputBox>
          
            <div style={{ width:"100%"}}>
      <table style={{ width:"100%"}} >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Booking Type</th>
          </tr>
        </thead>
        <tbody>
          {flight?.passengers.map((passenger, index) => (
            <tr key={index}>
              <td >{passenger.firstName}</td>
              <td >{passenger.lastName}</td>
              <td >{passenger.age}</td>
              <td >{passenger.gender}</td>
              <td >{passenger.bookingType=="Business Seat Fare"?"Business Class":"Economy Class" }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            



          </UserDetails>

        </form>
        <div  style={{ display:"flex" , justifyContent:"center"}} >

    <button style={{backgroundColor:"GrayText",margin:'20px',height:"40px",width:"50%"  }}  
    onClick={handleSubmit}
    type='button'
      >
    Back 
</button>

</div>
      </div>
    </Container>
    </div>
  );
}
export default UserBookingDetails;
