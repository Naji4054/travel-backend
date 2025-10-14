import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   status: { type: String , enum:['published', 'draft']},
   createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   },
   isDeleted: {type: Boolean , default: false}
}, { timestamps: true})

const Category = mongoose.model('Category', categorySchema)

export default Category;