let mongoose = require('mongoose');

let RecipeSchema = new  mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    ingredients : [{
        type : String,
        require : true
    }],
    instruction : {
        type : String,
        require : true
    },
    cuisine : {
        type  : String,
    },
    author : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }
},{timestamps : true})

let Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports  = Recipe;
