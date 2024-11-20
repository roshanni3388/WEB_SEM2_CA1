const mongoose=require('mongoose')

const ContactSchema=mongoose.Schema({
    fname:{type:String},
    email:{type:String},
    subject:{type:String},
    message:{type:String}
})

const ContactModel=mongoose.model("Contact",ContactSchema);

module.exports=ContactModel