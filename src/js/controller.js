import * as model from './model.js';
import recipeView from './views/recipeView.js';
//"url:" is the format for importing STATIC assets in Parcel2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //Slice used to remove "#" in beginning
    const idHash = window.location.hash.slice(1);
    if (!idHash) return;
    recipeView.renderSpinner();

    //Load recipe (async function hence await!)
    await model.loadRecipe(idHash);

    //The function above does not RETURN anything, it manipulates the state in the model
    //Now we'll access that same state
    const recipe = model.state.recipe;

    //Render using a View method
    recipeView.render(recipe);

    //Rendering this recipe in html
  } catch (err) {
    recipeView.renderError();
  }
};

//294 publisher-subscriber, importing handler from RecipeView
const init = function () {
  recipeView.addHandlerMethod(controlRecipes);
};
init();
