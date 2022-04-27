const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

console.log('Hahahah');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} code: ${res.status}`);
    }
    console.log(res);
    console.log(data);
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
    const recipe = {
      id,
      title,
      publisher,
      sourceURL,
      image,
      servings,
      cookingTime,
      ingredients,
    };
    console.log(recipe);
  } catch (err) {
    alert(err);
  }
};
showRecipe();
