import { Button, Image, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function ViewAllFlights() {
    const [data,setData] =useState([])
    const [record,setRecord] =useState([])
    const navigate=useNavigate()
    const columns = [
        {
            name: 'Image',
            selector:(row )=> (
            <>
                <Image
                    borderRadius='full'
                    boxSize='100px'
                    src={`http://localhost:5000/images/${row.pic}`}
                    alt={row.fname}
                    style={{padding:'5px'}}
                />
            </>
       ),
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Flight Name',
            selector: row => row.flightName,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Flight Number',
            selector: row => row.flightNumber,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'AirPort Name',
            selector: row => row.airportName,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: 'Company Name',
            selector: row => row.companyName,
            sortable:true,
            ignoreRowClick: true,
            allowOverflow: true,
       
        },
     
        {
            name: 'Action',
            cell: (row) => (
                <div>
                <span style={{margin:"10px"}} onClick={()=>HendleClick(row._id)} ><FontAwesomeIcon icon={faPenToSquare} /></span>   
                <span  style={{margin:"10px"}}  onClick={()=>DeleteItem(row._id)} ><FontAwesomeIcon icon={faTrash} /></span>
            </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
