import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String , enum:['published', 'draft']},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
       },
    country : { type: String , required: true},
    state: { type: String },
    city: { type: String},
    isDeleted: {type: Boolean , default: false}
}, { timestamps: true })

const Location = mongoose.model('Location', locationSchema)

export default Location;