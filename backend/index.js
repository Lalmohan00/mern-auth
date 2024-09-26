const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db');
//bodyParser: jo post ke andar hoti hai jisko hum user/client  se lete hai api ke trah jaise "name password etc" 
const bodyParser = require('body-parser');
// core : dusre port se agar koi request/data send karta hai to usko accept karane ke liye use hota hai esme hum object madad se validate kar sakte hai ki keval esi port ka data allow hai
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('pong');
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})