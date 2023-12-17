import * as model from './model.js';
import recipeView from './views/recipeView.js';

//this package is for polyfilling features for most real world browsers
import 'core-js/stable';
//this package is for polyfilling async and await
import 'regenerator-runtime/runtime';

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipes() {
  try {
    //getting the recipe id from the url(url was first set to anchor clicking on which makes the url to change id and we take that id and fetch the particular recipe )
    const id = window.location.hash.slice(1);
    //1) Loading recipe
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(recipe);

    //2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
    // recipeView.renderError(err);
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
