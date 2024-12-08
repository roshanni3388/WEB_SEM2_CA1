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
const UserModel = require('../models/UserModel');
const FlightModel = require('../models/FlightModel');
const BookingModel = require('../models/BookingModel');
const ContactModel = require('../models/ContactModel');

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
        // console.log(req.cookies)
        const token=req.cookies.Token;
        // console.log(token)
        if(!token){
           return res.json({Error:"The token was not available"})
        }else{
         jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
        if(err){
         console.error(err)
         return res.json({Error:"Token is  wrong"})
        }
        // console.log(decoded);
        req.role=decoded.role;
        req.user=decoded.user
        req.id=decoded.id
        next()
    
       })
    
        }
    }

    router.post("/signup",upload.single("pic"),async(req,res)=>{
        const pic = req.file ? req.file.filename : null;  
    
       const {fname,lname,email,password,state,contact,pincode,country,city,gender,birthDate}=req.body
    
       UserModel.create({pic,fname,lname,email,password,state,contact,pincode,country,city,gender,birthDate})
       .then((result)=>{
        res.json({message:"User SuccessFully Created",result})
       })
       .catch((error)=>{
        res.json({message:"Sorry User SuccessFully not Created",error})
       })
        
    })
   
    router.post('/login',async(req,res)=>{
        const {email,password} =req.body
         
        UserModel.findOne({email}).
        then((data)=>{
         if(!data){
             return res.json({message:"Sorry User not exit"})
         }
         if(data && data.password!=password){
             return res.json({message:"Sorry your password is wrong !"})
         }
        //  if(data && data.status!="Accept"){
        //    return res.json({message:"User login Unsuccesfully deo to status!"}) 
        //  }
     
         const token = jwt.sign(
             { role : 'user',user:data,id:data._id},
             "jwt-secret-key",
             { expiresIn:"1d" }
          )
     
          res.cookie('Token',token);
          console.log(token)
          res.json({message:"User login Succesfully !",data,token}) 
     
        })
        .catch((error)=>{
          res.json({message:"User login Unsuccesfully !",error}) 
        })
     
     
     
     })

     router.get('/logout',async(req,res)=>{
        res.clearCookie('Token');
        console.log(res.cookies)
        return res.json( {Status: 'Logout successful'});
    
    }) 

    router.get('/home',verifyuser,(req,res)=>{
        return res.json({Status:"Success" , role:req.role , user:req.user,})
    })
    
    router.put('/changePassword', verifyuser, async(req, res) => {
        const userId = req.id;
        console.log("userId", userId)
        const { currentPassword, newPassword } = req.body;
       
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid user ID.' });
        }
      
        UserModel.findById(userId)
          .then((user) => {
            if (!user) {
              return res.status(200).json({ message: 'User not found.' });
            }
            // Compare the provided current password with the stored password
            if (currentPassword != user.password) {
              return res.status(200).json({ message: 'Current password is incorrect.' });
            }
      
            // Update the user's password with the new password
            user.password = newPassword;
            user.save()
              .then(() => {
                // Password changed successfully
                res.status(200).json({ message: 'Password changed successfully' });
              })
              .catch((saveErr) => {
                console.error(saveErr);
                res.status(500).json({ message: 'User update failed.' });
              });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Password change failed.' });
          });
      });
