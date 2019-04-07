const bodyParser = require('body-parser');
// const genres = require('../controllers/genres');
// const customers = require('../controllers/customers');
// const movies = require('../controllers/movies');
// const rentals = require('../controllers/rentals');
const usersController = require('../controllers/users');
const sellersController = require('../controllers/sellers');
const auth = require('../middleware/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api/v1/users', usersController);
    app.use('/api/v1/sellers', sellersController)
    app.use(error);
}