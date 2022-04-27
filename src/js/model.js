export const state = {
  recipe: {},
};

export const loadRecipe = async function (idHash) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${idHash}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} code: ${res.status}`);
    }
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
    alert(err);
  }
};
