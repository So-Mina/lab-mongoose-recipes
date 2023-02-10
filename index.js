const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(async(x) => {
    
    const newRecipe = await Recipe.create({
      title: 'my recipe title',
      level: 'Easy Peasy',
      ingredients: ['ingredient1', 'ingredient2'],
      cuisine: 'cuisine',
      dishType: 'snack',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 05,
      creator: 'Mina',
      created: '2023-02-10'
    }) 
    console.log(newRecipe.title)
  })

  .then(async() => {  
    const allRecipes = await Recipe.insertMany(data)

    allRecipes.forEach(recipe => {
       console.log(recipe.title)
      })
  })

  .then(async() => {
    await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    )
    console.log('Rigatoni updated!')
  })

  .then(async() => {
    await Recipe.deleteOne({ name: 'Carrot Cake' })
    console.log('Carrot Cake removed!')
  })

  .catch(error => { 
      console.error('Error connecting to the database', error)
  })

 .finally(() => {
    mongoose.connection.close()
  })
