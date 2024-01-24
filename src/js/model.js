import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const response = await getJSON(`${API_URL}${id}`);
    // const recipe = await data.json();
    const { recipe } = response.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const response = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = response.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
      };
    });
    console.log(state.search.results);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchResultsPage = function (page) {
  state.search.page = page;
  let start = (page - 1) * RES_PER_PAGE;
  let end = page * RES_PER_PAGE;

  return state.search.results.slice(start, end);
};

export function updateServings(newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = Math.ceil(
      (ingredient.quantity * newServings) / state.recipe.servings
    );
    state.recipe.servings = newServings;
    //formula for newIngredientQuantity: (newServing * OldIngredientQuantity) / oldServing
  });
}
