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
    type: { type: String, enum: ['international', 'domestic', 'group'], required: true },
    category: { type: String, enum: ['wilderness', 'cities', 'beaches'], required: true },
    date: { type:String,  },
    image: { 
        type: [imageSchema], default: null
    },
    status: { type: String, required: true},
    location : {
        country : { type: String , required: true},
        state: { type: String },
        city: { type: String}
    },
    price: { type: String , required: true}

}, {timestamps: true});

const Package = mongoose.model('Package', packageSchema)

export default Package;