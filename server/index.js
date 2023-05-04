import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '31mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '31mb', extended: true }))
app.use(cors());

// routes
app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.use('/', (req, res) => {
  res.send('Hey, the server is running')
})

// setup mongodb
const CONNECTION_URL = process.env.LOCAL_DB
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set();