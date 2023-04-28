import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'


const app = express();

app.use(bodyParser.json({ limit: '31mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '31mb', extended: true }))
app.use(cors());

// routes
app.use('/posts', postRoutes)

// setup mongodb
const CONNECTION_URL = 'mongodb+srv://gogreneinfo:cat89boy@cluster0.pwt69y1.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set();