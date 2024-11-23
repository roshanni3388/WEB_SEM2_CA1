import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Home() {
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
            <a href="/"><h2 style={{color:"white"}} >Flight Booking System</h2></a>
          </div>
          <nav id="nav-menu-container">
            <ul className="nav-menu">
              <li><a href="/">Home</a></li>
              <li><Link to="frontDestinationPage">Destinations</Link></li>
              <li><Link to="login">User Login</Link></li>
              <li><Link to="signup">User SignUp</Link></li>
              <li><Link to="adminLogin">Admin Login</Link></li>

              <li><Link to="contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
       </header>
      

        <Outlet/>

        <footer className="footer-area section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3  col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h6>About Agency</h6>
                            <p>
                            This headline positions your website as the gateway to exciting adventures. It assures users that they can book flights with confidence and convenience, knowing that your platform has everything they need for a smooth travel experience.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h6>Navigation Links</h6>
                            <div className="row">
                                <div className="col">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Feature</a></li>
                                        <li><a href="#">Services</a></li>
                                        <li><a href="#">Portfolio</a></li>
                                    </ul>

                                    </div>
                                <div className="col">
                                    <ul>
                                        <li><a href="#">Team</a></li>
                                        <li><a href="#">Pricing</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="col-lg-3  col-md-6 col-sm-6">
                        <div className="single-footer-widget mail-chimp">
                            <h6 className="mb-20">InstaFeed</h6>
                            <ul className="instafeed d-flex flex-wrap">
                                <li><img src="img/i1.jpg" alt="" /></li>
                                <li><img src="img/i2.jpg" alt="" /></li>
                                <li><img src="img/i3.jpg" alt="" /></li>
                                <li><img src="img/i4.jpg" alt="" /></li>
                                <li><img src="img/i5.jpg" alt="" /></li>
                                <li><img src="img/i6.jpg" alt="" /></li>
                                <li><img src="img/i7.jpg" alt="" /></li>
                                <li><img src="img/i8.jpg" alt="" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row footer-bottom d-flex justify-content-between align-items-center">
                    <p className="col-lg-8 col-sm-12 footer-text m-0">
                        Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <h6>Flight Booking System</h6>
                    </p>
                    <div className="col-lg-4 col-sm-12 footer-social">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                        <a href="#"><i className="fa fa-dribbble"></i></a>
                        <a href="#"><i className="fa fa-behance"></i></a>
                    </div>
                </div>
            </div>
        </footer>

    </div>
  )
}

export default Home