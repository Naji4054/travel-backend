import express from 'express'
import cors from 'cors'
import dbConfig from './config/dbConfig.js'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js';
import packageRoutes from './routes/package.routes.js';
import categoryRoutes from './routes/category.routes.js';
import locationRoutes from './routes/location.routes.js';

dotenv.config();
const app = express()


dbConfig()

const corsOptions = {
    origin: process.env.FRONTEND_URL
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/packages',packageRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/location',locationRoutes)

app.get('/', (req, res)=> {
    res.send('API IS RUNNING...')
})
app.listen(3000, ()=> {
    console.log('server is running on port 3000')
})