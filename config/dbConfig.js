import mongoose from "mongoose";

const dbConfig = () => {

    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>console.log("monogDB connection established")).catch((err =>console.error(err)))
        
    } catch (error) {
        console.error(error)
    }
}

    // Example of a Mongoose connection string
   

export default dbConfig;