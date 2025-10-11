import mongoose from "mongoose";

const dbConfig = () => {

    try {
        mongoose.connect(process.env.MONGO_URI).then(()=>console.log("monogDB connection established")).catch((err =>console.error(err)))
    } catch (error) {
        console.error(error)
    }
}

export default dbConfig;