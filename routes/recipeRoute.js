let express = require('express');
let route = express();
let controller = require('../controllers/recipeController');

route.get('/defaults', controller.defaults);
route.post('/', controller.addRecipe);
route.get('/', controller.allRecipe);
route.patch('/:id', controller.updateRecipe);
route.delete('/:id', controller.deleteRecipe);

module.exports = route