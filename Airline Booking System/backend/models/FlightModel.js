const mongoose=require('mongoose')

const FlightSchema=mongoose.Schema({
    companyName:{type:String},
    flightName:{type:String},
    flightNumber:{type:String},
    airportName:{type:String},
    fromCity:{type:String},
    destinationCity:{type:String},
    fromCityATime:{type:String},
    fromCityDTime:{type:String},
    destinationCityATime:{type:String},
    destinationCityDTime:{type:String},
    days:{type:String},
    businessSeats:{type:String},
    businessSeatFare:{type:String},
    economicSeats:{type:String},
    economicSeatFare:{type:String},
    pic:{type:String},
    status:{type:String,default:"Pending"}
})
const FlightModel=mongoose.model("Flight",FlightSchema);

module.exports=FlightModel