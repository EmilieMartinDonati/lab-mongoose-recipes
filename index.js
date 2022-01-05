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
  .then(() => {
    // Run your code here, after you have insured that the connection was made;

    function createRecipe() {
      const carbo = new Recipe({ title: 'Pasta Carbonara', level: 'Easy Peasy', ingredients: ['unsalted butter', '1/2 pound pancetta', '1-2 garlic cloves', '3-4 whole eggs', '1 cup grated Parmesan', '1 pound spaghetti', 'salt', 'black pepper'], cuisine: 'italian', dishType: "main_course", image: 'carbo.jpg', duration: 30, creator: 'Emilie Martin' });
      carbo.save();
      console.log(carbo.title);
     }

     function insertFunction() {
      Recipe.insertMany(data).then(function () {
        console.log("Data inserted")  
      }).catch(function (error) {
        console.log(error)      
      });
    }

    function updateFunction() {
      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      ).then(console.log("updated")).catch((err) => (console.log(err)))
    }

    function removeFunction() {

      Recipe.findOneAndRemove({ title: "Carrot Cake" })
        .then(() => {
          console.log("deleted cake");
        })
        .catch((err) => console.error(err));
      }

   (async function everything () {
   try {
     let res;
     res = await createRecipe();
     console.log(res);

     res = await insertFunction();
     console.log(res);

     res = await updateFunction();
     console.log(res);

     removeFunction();
   } catch (error) {
     console.error(error);
   }
  })()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
  setTimeout(() =>  mongoose.connection.close(), 8000);
 


