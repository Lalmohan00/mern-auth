
const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is required' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET); //decoded check token is expare or not 
        req.user = decoded; // agar sab sahi hai to bina database ke madad se hum login kar ske
        next(); // aage ja sakte ho
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized , JWT token wrong or expired' });
    }
}

module.exports = ensureAuthenticated;