const express = require('express');
const router = express.Router();
const { getOwnerList } = require('../web3');
const { BAYC, COOL } = require('../constant')

router.get('/', async function(req, res) {
    console.log('Start get owner list from smart contract');
    const coolOwnerList = await getOwnerList(COOL);
    const baycOwnerList = await getOwnerList(BAYC);

    const data = baycOwnerList.filter(value => coolOwnerList.includes(value)); // find intersection of 2 lists
    const response = {
        status: 'ok',
        data: data
    };
    console.log(`Finished and returned response: \n${JSON.stringify(response)}`);
    res.json(response);
})

module.exports = router;