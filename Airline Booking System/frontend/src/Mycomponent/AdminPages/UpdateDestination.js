import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Image, Radio, RadioGroup, Stack } from '@chakra-ui/react'
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
const UpdateDestination = () => {
  const location=useLocation()
  const {destination}=location.state?location.state:{destination :""}
  const [airportName,setAirportName]=useState(destination?.airportName)
  const [countryName,setCountry]=useState(destination?.countryName)
  const [cityName,setCity]=useState(destination?.cityName)
  const [desId,setdesId]=useState(destination?._id)
  const [pic,setPic]=useState([destination?.pic])
  const navigate=useNavigate()

  // useEffect(()=>{

  //     setCountry(destination?.countryName)
  //     console.log(destination?.countryName)
  // },[])

  // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!pic || !cityName|| !countryName ||  !airportName || !desId){
          alert("Please fill all filds");
          return
        }
      
        const formData = new FormData();
        formData.append('countryName', countryName);
        formData.append('cityName', cityName);
        formData.append('pic', pic); // Pass the file object directly
        formData.append('airportName', airportName);

        console.log(formData);
      
        axios.put(`http://localhost:5000/admin/updateDestination/${desId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((result) => {
            console.log(result.data.message);
            if (result.data.message==="Destination successfully updated") {
                navigate("/viewDestination");
                alert("Destination SuccessFully Updated");
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
          <h1 className="mb-5">Update Destination</h1>         
      </div> 
    <center>
    <Container style={{margin:"10px"}} >
    <Title> Destination</Title>
    <div className="content">
      <form action="#">
        <UserDetails>
          <InputBox style={{width:"100%"}} >
            <span className="details">Country Name</span>
            <Input type="text" value={countryName} placeholder="Enter your country name" onChange={(e)=>setCountry(e.target.value)} required />
          </InputBox>
          <InputBox style={{width:"100%"}} >
            <span className="details">City Name</span>
            <Input type="text" value={cityName} placeholder="Enter your city name" onChange={(e)=>setCity(e.target.value)} required />
          </InputBox >
          <InputBox style={{width:"100%"}} >
            <span className="details">AirPort Name</span>
            <Input type="text" value={airportName} placeholder="Enter your airport name" onChange={(e)=>setAirportName(e.target.value)} required />
          </InputBox>
      
          <InputBox style={{width:"100%"}} >
            <span className="details">Image</span>
            <Input type="file"  placeholder="Enter your password" onChange={handleImageChange} required />
          </InputBox>
          <InputBox>
            <span className="details"> <Image
                           borderRadius='full'
                           boxSize='100px'
                           src={`http://localhost:5000/images/${pic}`}
                        
                           style={{ marginLeft:"40vh"}}
                           /></span>
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
export default UpdateDestination;
