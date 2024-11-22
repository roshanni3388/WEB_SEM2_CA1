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
