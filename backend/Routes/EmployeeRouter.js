const { addEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../Controllers/EmployeeController');
const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.post('/add', ensureAuthenticated, addEmployee);
router.get('/', ensureAuthenticated, getEmployees);
router.put('/:id', ensureAuthenticated, updateEmployee);
router.delete('/:id', ensureAuthenticated, deleteEmployee);

module.exports = router;
