const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyparser = require('body-parser');
const router = require('./app/routes');

require('dotenv').config();


var corsOptions = {
    origin:'*'
};
app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(express.json());
app.use('/api',router)
app.listen(5000,()=>{
    console.log('Working')
})