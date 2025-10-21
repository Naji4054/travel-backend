import mongoose, { model } from "mongoose";

const guideSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    age: {
        type: String, required: true
    },
    gender: {
        type : String, enum : ['Male', 'Female'], required: true
    },
    email: {
        type : String, required: true
    },
    phone: {
        type : String, required: true
    },
    location : {
        type: String, required: true
    },
    language: {
        type: String
    },
    availability: {
        type : Boolean , required: true
    }
})

const Guide = mongoose.model('Guide',guideSchema)
export default Guide;