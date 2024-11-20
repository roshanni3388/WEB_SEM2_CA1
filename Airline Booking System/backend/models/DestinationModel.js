const mongoose=require('mongoose')

const DestinationSchema=mongoose.Schema({
    countryName:{type:String},
    airportName:{type:String},
    pic:{type:String},
    cityName:{type:String},
    status:{type:String,default:"Pending"}
})

const DestinationModel=mongoose.model("Destination",DestinationSchema);

module.exports=DestinationModel
