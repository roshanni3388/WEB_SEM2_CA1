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
    router.delete('/deleteUser/:id',async(req,res)=>{
      const id=req.params.id
      UserModel.findByIdAndDelete(id)
      .then((result)=>{
        res.json({message:"User SuccesFully Deleted",result})
      })
      .catch((error)=>{
         res.json({message:"User SuccesFully Not Delete",result})
      })

    })
    
    router.get('/getUser',verifyuser,async(req,res)=>{
      
      const id=req.user._id
      UserModel.findById(id)
      .then((result)=>{
        res.json({message:"We get all user",result})
      })
      .catch((error)=>{
         res.json({message:"We can not get all User",error})
      })

    })
    router.get('/getAllUser',async(req,res)=>{
      UserModel.find({})
      .then((result)=>{
        res.json({message:"We get all user",result})
      })
      .catch((error)=>{
         res.json({message:"We can not get all User",error})
      })

    })
   
    router.put("/updateProfile",verifyuser, upload.single("pic"), async (req, res) => {
      const id=req.user._id
  
      // Retrieve the existing destination by ID
      try {
          const user = await UserModel.findById(id);
          if (!user) {
              return res.status(404).json({ message: "user not found" });
          }
  
          // Update picture names only if new ones are provided, else retain the previous ones
          const pic = req.file ? req.file.filename : user.pic;  
  
          // Update other fields
          const {fname,lname,email,password,state,contact,pincode,country,city,gender,birthDate} = req.body;
  
          // Update the destination
          const updatedUser = await UserModel.findByIdAndUpdate(id, {pic,fname,lname,email,password,state,contact,pincode,country,city,gender,birthDate}, { new: true });
  
          res.json({ message: "User successfully updated", user: updatedUser });
      } catch (error) {
          res.status(500).json({ message: "Failed to update User", error });
      }
  });
   
  router.post("/createContact",async(req,res)=>{
    const {fname,email,subject,message}=req.body
 
    ContactModel.create({fname,email,subject,message})
    .then((result)=>{
     res.json({message:"Contact SuccessFully Created",result})
    })
    .catch((error)=>{
     res.json({message:"Sorry Contact SuccessFully not Created",error})
    })
     
 })
 
 router.get('/searchFlight', async (req, res) => {
  let { destinationCity, fromCity } = req.query;

  // Convert destinationCity and fromCity to lowercase
  destinationCity = destinationCity.toLowerCase();
  fromCity = fromCity.toLowerCase();

  // Use case-insensitive regex for search
  FlightModel.find({
    destinationCity: { $regex: new RegExp(destinationCity, 'i') },
    fromCity: { $regex: new RegExp(fromCity, 'i') }
  })
    .then((result) => {
      res.json({ message: "We get all Flight", result });
    })
    .catch((error) => {
      res.json({ message: "We can not get all Flight", error });
    });
});
 
router.post("/createBooking",verifyuser,async(req,res)=>{
     
    const userId = req.user._id    
    const bookingId = crypto.randomBytes(3).toString('hex').toUpperCase();
 
    const {passengers,total,flightId} =req.body
 
    BookingModel.create({passengers,total,flightId,userId,bookingId})
    .then((result)=>{
     res.json({message:"Booking SuccessFully Created",result})
    })
    .catch((error)=>{
     res.json({message:"Sorry Booking SuccessFully not Created",error})
    })
     

 })  
 router.get('/getUserBoking',verifyuser,async(req,res)=>{
      
  const id=req.user._id
  BookingModel.find({userId:id})
  .populate('userId')
  .populate('flightId')
  .then((result)=>{
    res.json({message:"We get all Booking",result})
  })
  .catch((error)=>{
     res.json({message:"We can not get all Booking",error})
  })

})
router.get('/getAllContact',async(req,res)=>{
  ContactModel.find({})
  .then((result)=>{
    res.json({message:"We get all Contact",result})
  })
  .catch((error)=>{
     res.json({message:"We can not get all Contact",error})
  })

})
router.get('/getAllBooking',async(req,res)=>{
  BookingModel.find({})
  .populate('userId')
  .populate('flightId')
  .then((result)=>{
    res.json({message:"We get all Booking",result})
  })
  .catch((error)=>{
     res.json({message:"We can not get all Booking",error})
  })

})

router.delete('/deleteBooking/:id',async(req,res)=>{
  const id=req.params.id
  BookingModel.findByIdAndDelete(id)
  .then((result)=>{
    res.json({message:"Booking SuccesFully Deleted",result})
  })
  .catch((error)=>{
     res.json({message:"Booking SuccesFully Not Delete",result})
  })

})
router.delete('/deleteContact/:id',async(req,res)=>{
  const id=req.params.id
  ContactModel.findByIdAndDelete(id)
  .then((result)=>{
    res.json({message:"Contact SuccesFully Deleted",result})
  })
  .catch((error)=>{
     res.json({message:"Contact SuccesFully Not Delete",result})
  })

})

    module.exports=router;
