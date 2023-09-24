import express from 'express'
const app= express();

app.use(express.json());
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import userRouter from './routes/user'
import todosRouter from './routes/todos'
import cors from 'cors'
const PORT= process.env.PORT;
app.use(cors());

app.use('/user',userRouter)
app.use('/todos',todosRouter)

if(typeof process.env.MONGO_URI === "string"){
mongoose.connect(process.env.MONGO_URI).then(()=> console.log('DB connected successfully')).catch((err)=> console.log(err))
}




app.listen(PORT, ()=> console.log(`Server is listening to port ${PORT}`)
)


