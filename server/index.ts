import express from 'express'
const app= express();

app.use(express.json());


import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const PORT= process.env.PORT;
const allowedOrigins = ['http://localhost:5173'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
  };
  app.use(cors(options));

import mongoose from 'mongoose'
import userRouter from './routes/user'
import todosRouter from './routes/todos'
import { log } from 'console';



app.use('/user',userRouter)
app.use('/todos',todosRouter)

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

if(typeof process.env.MONGO_URI === "string"){
mongoose.connect(process.env.MONGO_URI).then(()=> console.log('DB connected successfully')).catch((err)=> console.log(err))
}




app.listen(PORT, ()=> console.log(`Server is listening to port ${PORT}`)
)


