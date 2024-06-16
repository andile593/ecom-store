require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const errorMiddleware = require('./middlewares/error');

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());

const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const orderRoutes = require('./routes/order')

app.use('/', productRoutes)
app.use('/', userRoutes)
app.use('/', orderRoutes)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })

// error middleware
app.use(errorMiddleware);
