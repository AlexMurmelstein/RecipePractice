import { API_URL, API_SEARCH } from './config';
import { getJSON, recipeDestructure } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (idHash) {
  try {
    const data = await getJSON(`${API_URL}${idHash}`);
    //Extracting recipe details by destructuring
    const newObject = recipeDestructure(data.data.recipe);
    state.recipe = newObject;
  } catch (err) {
    console.error(`ERROR: ${err}`);
    //This will throw the error to the controller, so if there's an error here,
    //It will be caught by the catch(err) OVER THERE
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_SEARCH}${query}`);
    console.log(data.data.recipes);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};
