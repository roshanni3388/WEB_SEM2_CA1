import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ContactPage = () => {
    const [fname,setfname]=useState()
    const [message,setmessage]=useState()
    const [email,setemail]=useState()
    const [subject,setsubject]=useState()
    const navigate=useNavigate()

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
    return (
        <div>
          <section class="relative about-banner">	
                  <div class="overlay overlay-bg"></div>
                  <div class="container">				
                      <div class="row d-flex align-items-center justify-content-center">
                          <div class="about-content col-lg-12">
                              <h1 class="text-white">
                                  Feedback			
                              </h1>	
                              <p class="text-white link-nav"><Link to="/userdashBoard">Search Flight</Link>  <span class="lnr lnr-arrow-right"></span>   Feedback </p>
                          </div>	
                      </div>
                  </div>
          </section>
  
            <section className="contact-page-area section-gap">
              <div className="container">
                   <div className="row d-flex justify-content-center">
                          <div className="menu-content pb-70 col-lg-8">
                              <div className="title text-center">
                                  <h1 className="mb-10">Feedback</h1>
                              </div>
                          </div>
                  </div>
                  <div className="row">
                      <div className="col-lg-4 d-flex flex-column address-wrap">
                          <div className="single-contact-address d-flex flex-row">
                              <div className="icon">
                                  <span className="lnr lnr-home"></span>
                              </div>
                              <div className="contact-details">
                                  <h5>Binghamton, New York</h5>
                                  <p>4343 Hinkle Deegan Lake Road</p>
                              </div>
                          </div>
                          <div className="single-contact-address d-flex flex-row">
                              <div className="icon">
                                  <span className="lnr lnr-phone-handset"></span>
                              </div>
                              <div className="contact-details">
                                  <h5>00 (****) 9865 ***</h5>
                                  <p>Mon to Fri 9am to 6 pm</p>
                              </div>
                          </div>
                          <div className="single-contact-address d-flex flex-row">
                              <div className="icon">
                                  <span className="lnr lnr-envelope"></span>
                              </div>
                              <div className="contact-details">
                                  <h5>su***rt@*******.com</h5>
                                  <p>Send us your query anytime!</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-8">
                          <form className="form-area contact-form text-right" id="myForm" onSubmit={handleSubmit}>
                              <div className="row">
                                  <div className="col-lg-6 form-group">
                                      <input
                                          name="name"
                                          placeholder="Enter your name"
                                        
                                          onChange={(e)=>setfname(e.target.value)}
                                          className="common-input mb-20 form-control"
                                          required
                                          type="text"
                                      />
  
                                      <input
                                          name="email"
                                          placeholder="Enter email address"
                      
                                          onChange={(e)=>setemail(e.target.value)}
                                          className="common-input mb-20 form-control"
                                          required
                                          type="email"
                                      />
  
                                      <input
                                          name="subject"
                                          placeholder="Enter subject"
                                        
                                          onChange={(e)=>setsubject(e.target.value)}
                                          className="common-input mb-20 form-control"
                                          required
                                          type="text"
                                      />
                                  </div>
                                  <div className="col-lg-6 form-group">
                                      <textarea
                                          className="common-textarea form-control"
                                          name="message"
                                          placeholder="Enter Message & Feedback"
                                       
                                          onChange={(e)=>setmessage(e.target.value)}
                                          required
                                      ></textarea>
                                  </div>
                                  <div className="col-lg-12">
                                      <div className="alert-msg" style={{ textAlign: 'left' }}></div>
                                      <button onClick={handleSubmit} className="genric-btn primary" style={{ float: 'right' }}>Send Message</button>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </section>
  
        </div>
        
      );
  };
  
  export default ContactPage;
  