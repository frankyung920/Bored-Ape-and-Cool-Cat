const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 8000;
const nft = require('./controllers/NFTController.js');

app.use('/nft', nft);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});