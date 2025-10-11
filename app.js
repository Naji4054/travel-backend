import express from 'express'
import cors from 'cors'
import dbConfig from './config/dbConfig.js'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express()

app.use(cors())

dbConfig()
app.use(cors())
app.use(express.json())

app.use('/api/v1/auth',authRoutes)

app.get('/', (req, res)=> {
    res.send('API IS RUNNING...')
})
app.listen(3000, ()=> {
    console.log('server is running on port 3000')
})