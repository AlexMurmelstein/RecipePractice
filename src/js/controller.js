//"url:" is the format for importing STATIC assets in Parcel2
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const renderSpinner = function (parentEl) {
  const markup = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>`;

  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};
const showRecipe = async function () {
  try {
    //Slice used to remove "#" in beginning
    const idHash = window.location.hash.slice(1);
    if (!idHash) return;
    renderSpinner(recipeContainer);
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
    //Rendering this recipe in html
    const markup = `<figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map(
              ing =>
                `<li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>`
            )
            .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
    //clear inner HTML first
    recipeContainer.innerHTML = '';
    //Insert new HTML
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};

//290-listening for hash change (when we change url), and load (when we copy-paste url to new window)
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);
