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
      const verifyuser= async (req,res,next)=>{
        console.log(req.cookies)
        const token=req.cookies.Token;
        console.log(token)
        if(!token){
           return res.json({Error:"The token was not available"})
        }else{
         jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
        if(err){
         console.error(err)
         return res.json({Error:"Token is  wrong"})
        }
        console.log(decoded);
        req.role=decoded.role;
        req.user=decoded.user
        req.id=decoded.id
        next()
    
       })
    
        }
    }
router.post('/login',async(req,res)=>{
       const {username,password} =req.body
        
       AdminModel.findOne({username}).
       then((data)=>{
        if(!data){
            return res.json({message:"Sorry admin not exit"})
        }
        if(data && data.password!=password){
            return res.json({message:"Sorry your password is wrong !"})
        }
    
        const token = jwt.sign(
            { role : 'admin',id:data._id, user:data },
            "jwt-secret-key",
            { expiresIn:"1d" }
         )
    
         res.cookie('Token',token);
         console.log(token)
         res.json({message:"Admin login Succesfully !",data,token}) 
    
       })
       .catch((error)=>{
         res.json({message:"Admin login Unsuccesfully !",error}) 
       })
    
    }) 
