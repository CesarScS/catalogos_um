var express = require('express');
var router = express.Router();
const jsonReader = require('../helpers/jsonReaderHelper');

/* GET users listing. */
router.get('/getByZip/:zip', async function(req, res, next) {
    try {
        const {zip} = req.params;
        var response = await jsonReader.GetByZip(zip);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
