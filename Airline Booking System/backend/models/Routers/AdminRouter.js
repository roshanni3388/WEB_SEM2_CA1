const express = require('express')
const app = express();
const router=express.Router();
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto= require('crypto')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose")
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const AdminModel = require('../models/AdminModel');
const FlightModel = require('../models/FlightModel');
const DestinationModel = require('../models/DestinationModel');



app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
    }));


    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
        }
      })
      
      const upload = multer({
          storage: storage
      })    
