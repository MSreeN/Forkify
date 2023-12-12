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
    alert(err);
    console.error(err);
  }
}

// controlRecipes();

//loading the recipe whenever the hash changes
// window.addEventListener('hashchange', controlRecipes);
// if you paste the url in other tab it won't load the recipe because there is no hash change because hash was created when you pasted the url so website won't show the recipe
// We should make use of load event that fires when page was loaded for the first time
// we should use load event when url is pasted to other tab because hashchange event won't get fired as said above hash was created for the first time there and wasn't changed and we should use hashchange event when hash was changed in same tab, we can't use load event here because load event gets fired when page is loaded for first time and page was already loaded here

// flow => user clicks on anchor tag => anchor tag changes has as set to href => when hash changes window fires hashchange event and executes code
//looping through these 2 events right after code executes
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
