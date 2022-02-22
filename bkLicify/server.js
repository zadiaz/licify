import express from 'express'
import path from 'path'
import { config } from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import { cors } from "./middleware/corsMiddlewar.js"
import usersRoutes from './routes/usersRoutes.js'
import invoicesRoutes from './routes/invoicesRoutes.js'

config()
connectDB()

const app = express()
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors)

app.get('/', (req, res) => {
    res.send('API is running')
})


app.use('/api/users', usersRoutes)
app.use('/api/invoices', invoicesRoutes)



app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))