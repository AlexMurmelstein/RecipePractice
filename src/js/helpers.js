import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} code: ${res.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const recipeDestructure = function (toDes) {
  //toDes=input to be destructured
  const {
    id,
    title,
    publisher,
    source_url: sourceURL,
    image_url: image,
    servings,
    cooking_time: cookingTime,
    ingredients,
  } = toDes;

  //Creating a new "recipe" obj using the above
  const newObj = {
    id,
    title,
    publisher,
    sourceURL,
    image,
    servings,
    cookingTime,
    ingredients,
  };

  return newObj;
};
