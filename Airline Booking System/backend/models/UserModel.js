const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    pic:{type:String},
    birthDate:{type:String},
    contact:{type:String},
    gender:{type:String},
    city:{type:String},
    country:{type:String},
    pincode:{type:String},
    state:{type:String},
    status:{type:String,default:"Pending"}
})

const UserModel=mongoose.model("User",UserSchema);

module.exports=UserModel