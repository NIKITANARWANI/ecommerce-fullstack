const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();


// Or restrict to specific origin
// app.use(cors({ origin: 'http://localhost:3000' }));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
