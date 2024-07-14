const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');
const page1 = require('./data/page1.js');
const page2 = require('./data/page2.js');
const page3 = require('./data/page3.js');

dotEnv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({extented:true}));
app.get('/', (req, res) => {
    if(req.query.page === '1') {
        res.status(201).json(page1.page);
    } else if(req.query.page === '2') {
        res.status(201).json(page2.page);
    } else if(req.query.page === '3') {
        res.status(201).json(page3.page);
    }
    res.status(201).json({'testing': 'value'});
});

app.listen(process.env.PORT, () => {
    console.log(`Application is running port http://localhost:${process.env.PORT}`);
})