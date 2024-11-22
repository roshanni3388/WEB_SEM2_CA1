import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function FrontDestinationPage() {
    const navigate=useNavigate()
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
        setCurrentPage2(1); // Reset current page to 1 when filter changes
    }
    const HendleClick2=()=>{
        alert("If You Wants Read OR Book Destination You Should Login")
  }


  return (
    <div>
         <section class="relative about-banner">	
				<div class="overlay overlay-bg"></div>
				<div class="container">				
					<div class="row d-flex align-items-center justify-content-center">
						<div class="about-content col-lg-12">
							<h1 class="text-white">
                             Destinations		
							</h1>	
							<p class="text-white link-nav"> <span class="lnr lnr-arrow-right"></span>   Destinations </p>
						</div>	
					</div>
				</div>
		 </section>
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
        

    </div>
  )
}

export default FrontDestinationPage
