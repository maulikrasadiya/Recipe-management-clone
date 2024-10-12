const jwt = require('jsonwebtoken');
const Recipe = require('../models/recipeModel');
require('dotenv').config();

JWT_SECRET = process.env.JWT_SECRET ;

let defaults = (req ,res) =>{
    res.send("its recipes default route")
}
let addRecipe = async  (req ,res) =>{
    try {
        const token = req.cookies.token ;
        if(!token){
            return res.status(400).json({message : "Unauthorized"})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const author = decoded.id ;
        const {title , ingredients ,  instruction , cuisine} = req.body

        const  recipe = new Recipe({
            title ,
            ingredients ,
            instruction ,
            cuisine ,
            author
        })
        await recipe.save()
        res.status(201).json({message : "Recipe create successfully",recipe : recipe})
    
    } catch (error) {
        res.status(500).json({message : "Error add recipe", error : error.message})
    }   
}
let allRecipe = async (req,res) =>{
    try {
        const token = req.cookies.token ;
        if(!token){
            return res.status(400).json({message : "Unauthorized"})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const author = decoded.id ;
        const recipes = await Recipe.find({author}).populate('author', 'name email')
        res.status(200).json(recipes)
    
    } catch (error) {
        res.status(500).json({message : "Error show recipe", error : error.message})
    }  
}
let updateRecipe = async (req,res) =>{
    const {title , ingredients ,  instruction , cuisine} = req.body
    const id = req.params.id;
    try {

        let recipe = await Recipe.findByIdAndUpdate(id ,{title : title , ingredients : ingredients , instruction : instruction , cuisine : cuisine})
        res.status(201).json({message : "Recipe update successfully", recipe : recipe})
    
    } catch (error) {
        res.status(500).json({message : "Error update recipe", error : error.message})
    }     
}
let deleteRecipe = async (req,res) =>{
    try {
        const id = req.params.id;

        await Recipe.findByIdAndDelete(id)
        res.status(201).json({message : "Recipe delete successfully"})
    
    } catch (error) {
        res.status(500).json({message : "Error delete recipe", error : error.message})
    } 
}

module.exports = {
    defaults ,
    addRecipe ,
    allRecipe ,
    updateRecipe ,
    deleteRecipe
}