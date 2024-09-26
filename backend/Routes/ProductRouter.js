const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

//ensureAuthenticated: nichhe ye ek middleware ka kam kar raha hai jo batata hai ye work resolve hone se pahle
router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        { id: 1, name: 'John', mobile_No: '9478674734' },
        { id: 2, name: 'Mona', mobile_No: '8674787540' },

    ])
});

module.exports = router; 