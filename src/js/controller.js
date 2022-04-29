import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

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

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //Load search results
    await model.loadSearchResults(query);
    //Render results
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

//294 publisher-subscriber, importing handler from RecipeView
const init = function () {
  recipeView.addHandlerMethod(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
