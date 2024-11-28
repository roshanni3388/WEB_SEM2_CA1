import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,Avatar,} from '@chakra-ui/react'
import axios from 'axios';

function AdminPanel() {
    axios.defaults.withCredentials = true;
    const navigate=useNavigate()
    const [user,setUser]=useState()


    const handleLogout=(e)=>{
        e.preventDefault();
        axios.get(`http://localhost:5000/admin/logout`)
        .then((result)=>{
          if(result.data.Status ==='Logout successful'){
            alert("Admin Logout Successfull")
            navigate("/")
          }
          else{
            alert("Admin not Logout Successfull")
          }
        })
        .catch(()=>{
          alert("Admin Not  Logout Successfull deo to backend error")
        })
  
      }
  
    useEffect(()=>{
        axios.get(`http://localhost:5000/user/home`)
        .then((result)=>{
          if(result.data.Status==="Success"){
            console.log(result.data.user)
            setUser(result.data.user)
          }else{
            navigate('/')
          }

        }).catch((error)=>{
          console.log(error)
          navigate('/')
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
        <div className="row align-items-center justify-content-between d-flex" style={{width:"100%"}}>
        <div id="logo" style={{marginLeft:"-1vh"}}>
            <Link to="dashBoard"><h4 style={{color:"white",fontSize:"18px" }} >Flight Booking System</h4></Link>
          </div>
          <div style={{marginRight:"-6vh"}}>
          <nav id="nav-menu-container"> 
            <ul  className="nav-menu">
              <li><Link to="dashBoard">DashBoard</Link></li>
              <li><Link to="viewAllUser" >View User</Link></li>
              <li><Link to="addDestination">Add Destinations</Link></li>
              <li><Link to="viewDestination">View Destinations</Link></li>
              <li><Link to="addFlight">Add Flight</Link></li>
              <li><Link to="viewAllFlight">View Flight</Link></li>
              <li><Link to="viewAllBooking">View All Bookings</Link></li>
             
              {/* <li className="menu-has-children"><Link href="#">Destinations</Link>
                <ul>
                  <li><Link to="addDestination">Add Destinations</Link></li>
                  <li><Link to="">Blog Single</Link></li>
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
              <li><Link to="viewAllContactAndFeedback">Feedback</Link></li>
              <li> <Menu  className="nav-menu" >
                                <MenuButton className="menu-has-children">
                                <Avatar size={'sm'} cursor={'pointer'} name={user?.name}  src={`http://localhost:5000/images/${user?.pic}`} />
                                </MenuButton>
                                <MenuList >
                                <MenuItem style={{backgroundColor:"gray" ,color:"white"}} onClick={handleLogout} > LOGOUT </MenuItem>
                                <MenuDivider />
                                <MenuItem style={{backgroundColor:"gray"}} >  <Link to={'adminChangePassword'} > Change Password  </Link> </MenuItem>
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

export default AdminPanel