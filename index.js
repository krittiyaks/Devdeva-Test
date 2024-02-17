require('dotenv').config();

import express from 'express';
import { urlencoded, json } from "body-parser";
import { connect, connection } from 'mongoose';
const mongoString = process.env.DATABASE_URL;

connect(mongoString);

const database = connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

import routes from './routes/routes';
app.use('/api', routes)