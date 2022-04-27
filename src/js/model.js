import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (idHash) {
  try {
    const data = await getJSON(`${API_URL}/${idHash}`);
    //Extracting recipe details by destructuring
    const {
      id,
      title,
      publisher,
      source_url: sourceURL,
      image_url: image,
      servings,
      cooking_time: cookingTime,
      ingredients,
    } = data.data.recipe;
    //Creating a new "recipe" obj using the above
    state.recipe = {
      id,
      title,
      publisher,
      sourceURL,
      image,
      servings,
      cookingTime,
      ingredients,
    };
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
};
