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

       //    const HendleClick=(id)=>{
    //     navigate('/bookDestination',{state:{desId:id}})
    //  }
     const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if(searchTerm.length===0){
             return  setdata2(seavedata);
        }
        const newData = data2.filter(row => row.placename.toLowerCase().includes(searchTerm));
        setdata2(newData);
        setCurrentPage2(1); 
    }
    const HendleClick2=()=>{
        alert("If You Wants Read OR Book Destination You Should Login")
  }



  return (

         <div>
            <div >
            <section className="banner-area relative" >
            <div className="overlay overlay-bg" ></div>
            <div className="container"  style={{padding:"12vh"}} >
                <div className="row fullscreen align-items-center justify-content-between">
                    <div className="col-lg-6 col-md-6 banner-left">
                        <h6 className="text-white">Away from monotonous life</h6>
                        <h1 className="text-white">Magical Travel</h1>
                        <p className="text-white">
                        Here, the focus is on seamless travel experiences. Users are encouraged to explore the world without worries by effortlessly booking flights at their convenience, emphasizing the anytime, anywhere aspect.
                        </p>
                    
                    </div>
                    <div className="col-lg-4 col-md-6 banner-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="flight" role="tabpanel" aria-labelledby="flight-tab">
                                <form className="form-wrap">
                                <lable ><h3 style={{padding:"20px"}}>From City </h3></lable>
                                    <input type="text" onChange={(e)=>setfromCity(e.target.value)} className="form-control" placeholder="name"  />
                                    <lable> <h1>To</h1> </lable>
                                    <lable> <h3  style={{padding:"20px"}}>Destination City </h3> </lable>
                                    <input type="text" onChange={(e)=>setdestinationCity(e.target.value)} className="form-control"  placeholder="name" />
                                    <button onClick={handleSubmit2} className="primary-btn text-uppercase"> Search flights </button>
                                </form>
                            </div>
                          
                         
                        </div>
                    </div>
                </div>
            </div>
            </section>
            </div>
      
            <section className="popular-destination-area section-gap">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-70 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">Popular Destinations</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {currentItems2.map((d)=>(
                            <div key={d._id} className="col-lg-4">
                            <div className="single-destination relative">
                                <div className="thumb relative">
                                    <div className="overlay overlay-bg"></div>
                                    <img className="img-fluid"  src={`http://localhost:5000/images/${d.pic}`} alt="" />
                                </div>
                                <div className="desc">
                                    <p  className="price-btn">{d.countryName}</p>
                                    <h4>{d.airportName}</h4>
                                    <p>{d.cityName}</p>
                                </div>
                            </div>
                        </div>
                        )

                        )}
                     
                    </div>
                </div>
              
         </section>
         <div style={{display:"flex" ,justifyContent:"center"}} >
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(data2.length / itemsPerPage2) }).map((_, index) => (
                        <li  style={{margin:"4px"}} key={index} className={`page-item ${currentPage2 === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate2(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
        </div>
        
        
        
         <section  className="contact-page-area section-gap">
            <div className="container">
                 <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-70 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">Contact</h1>
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


  )
}

export default DataHome