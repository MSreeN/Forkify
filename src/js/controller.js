import * as model from './model.js';
import recipeView from './views/recipeView.js';

//this package is for polyfilling features for most real world browsers
import 'core-js/stable';
import searchView from './views/SearchView.js';
//this package is for polyfilling async and await
// import 'regenerator-runtime/runtime';
// import { async } from 'regenerator-runtime';

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

const controlSearchResults = async function () {
  const query = searchView.getQuery();
  if (!query) return;

  await model.loadSearchResults(query);
  console.log(model.state.search.results);
  searchView.clearInput();
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
