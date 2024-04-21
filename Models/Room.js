import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    attribute:{
        type:[String],
        required:true
    },
    room:{
        type:[Number],
        required:true
    },
    img:{
        type:String,
        required:true
    },
    priceWithBreakfast:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    adult:{
        type:Number,
        required:true,
    },
    children:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    roomNumbers:[{number:Number, unavailableDates:{type:[Date]}}],


},
{timestamps:true}
);

export default mongoose.model("Room", RoomSchema);