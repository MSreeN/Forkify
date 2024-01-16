import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/SearchView.js';
import ResultsView from './views/ResultsView.js';

// if (module.hot) {
//   module.hot.accept();
// }
//this package is for polyfilling features for most real world browsers
// import 'core-js/stable';

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
  ResultsView.renderSpinner();
  const query = searchView.getQuery();
  if (!query) return;

  await model.loadSearchResults(query);
  // ResultsView.render(model.state.search.results);
  ResultsView.render(model.loadSearchResults(1));
  console.log(model.state.search.results);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

//below code from parcel, only replaces the elements that needs to be replaced in the dom
// if (module.hot) {
//   module.hot.accept(() => {
//     location.reload();
//   });
// }

// "parcel": "^2.10.3"

// <use href="${icons}#icon-clock"></use>

// ${
//   ingredient.quantity
//     ? new Fraction(ingredient.quantity).toString()
//     : ''
// }
