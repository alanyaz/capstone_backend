require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('./utils/db')
const app = express();
const morgan = require("morgan")

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json()); 
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
