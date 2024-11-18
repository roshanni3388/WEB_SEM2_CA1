import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,Avatar,} from '@chakra-ui/react'
import axios from 'axios';

function UserPanel() {
    axios.defaults.withCredentials = true;
    const navigate=useNavigate()
    const [user,setUser]=useState()


    const handleLogout=(e)=>{
        e.preventDefault();
        axios.get(`http://localhost:5000/user/logout`)
        .then((result)=>{
          if(result.data.Status ==='Logout successful'){
            alert("User Logout Successfull")
            navigate("/")
          }
          else{
            alert("User not Logout Successfully")
          }
        })
        .catch(()=>{
          alert("User Not  Logout Successfull deo to backend error")
        })
  
      }

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/home`)
        .then((result)=>{
          if(result.data.Status==="Success"){
            console.log(result.data.user)
            // setUser(result.data.user)
          }else{
            navigate('/')
          }

        }).catch((error)=>{
          console.log(error)
          navigate('/')
        })
      },[])

      useEffect(()=>{
        axios.get(`http://localhost:5000/user/getUser`)
        .then((result)=>{
            console.log(result)
          if(result.data.message==="We get all user"){
            setUser(result.data.result)
          }

        }).catch((error)=>{
          console.log(error)
        })
      },[])

    return (
        <div>
             <header id="header">
          <div className="header-top">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-sm-6 col-6 header-top-left">
                  <ul>
                    <li><a href="#">Visit Us</a></li>
                    <li><a href="#">Buy Tickets</a></li>
                  </ul>			
                </div>
                <div className="col-lg-6 col-sm-6 col-6 header-top-right">
                <div class="header-social">
                                    <a href="#"><i class="fa fa-facebook"></i></a>
                                    <a href="#"><i class="fa fa-twitter"></i></a>
                                    <a href="#"><i class="fa fa-dribbble"></i></a>
                                    <a href="#"><i class="fa fa-behance"></i></a>
                        </div>
                </div>
              </div>			  					
            </div>
          </div>
          <div className="container main-menu">
          <div className="row align-items-center justify-content-between d-flex">
          <div id="logo">
          <Link to="/userdashBoard"><h2 style={{color:"white"}} >Flight Booking System</h2></Link>
          </div>
          <div>
          <nav id="nav-menu-container">
            <ul  className="nav-menu">
      
              <li><Link to="userdashBoard" >Search Flights</Link></li>
              <li><Link to="userDestinationPage">Destinations</Link></li>
              <li><Link to="viewUserBookings">View MY Bookings</Link></li>
              {/* <li><Link to="signup">User SignUp</Link></li>
              <li><Link to="adminLogin">Admin Login</Link></li> */}
             
              {/* <li className="menu-has-children"><a href="#">Blog</a>
                <ul>
                  <li><a href="blog-home.html">Blog Home</a></li>
                  <li><a href="blog-single.html">Blog Single</a></li>
                </ul>
              </li>	 */}
              {/* <li className="menu-has-children"><a href="#">Pages</a>
                <ul>
                  <li><a href="elements.html">Elements</a></li>
                  <li className="menu-has-children"><a href="#">Level 2</a>
                    <ul>
                      <li><a href="#">Item One</a></li>
                      <li><a href="#">Item Two</a></li>
                    </ul>
                  </li>					                		
                </ul>
              </li>					          					          		           */}
              <li><Link to="userContact">Feedback</Link></li>
              <li>
             <Menu  className="nav-menu" >
                                <MenuButton className="menu-has-children">
                                <Avatar size={'sm'} cursor={'pointer'} name={user?.name}  src={`http://localhost:5000/images/${user?.pic}`} />
                                </MenuButton>
                                <MenuList >
                                <MenuItem style={{backgroundColor:"gray" ,color:"white"}} onClick={handleLogout} > LOGOUT </MenuItem>
                                <MenuDivider />
                                <MenuItem style={{backgroundColor:"gray"}} >  <Link to={'userChangePassword'} > Change Password  </Link> </MenuItem>
                                <MenuDivider />
                                <MenuItem style={{backgroundColor:"gray"}} >  <Link to={'userMyProfile'} > My Profile  </Link> </MenuItem>
                                </MenuList>
             </Menu>

         </li>
            </ul>
            
           
          </nav>
          
          </div>
          
        </div>
      </div>
       </header>
        

        <Outlet/>


    </div>
  )
}

export default UserPanel