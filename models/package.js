import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    altText: { type: String, required: true },
    isCover: { type: Boolean, default: false }
})

const packageSchema = new mongoose.Schema({
    title: { type:String, required: true },
    description: { type: String , required: true },
    duration: { type: String, required: true },
    type: { type: String, enum: ['International', 'Domestic', 'Group'], required: true },
    category: { 
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Category'
    },
    date: { type:String,  },
    image: { 
        type: [imageSchema], default: null
    },
    status: { type: String, required: true},
    location : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    price: { type: String , required: true}

}, {timestamps: true});

const Package = mongoose.model('Package', packageSchema)

export default Package;