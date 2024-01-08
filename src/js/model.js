import { API_URL } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default searchResultsPage = function (page) {
  let start = (page - 1) * 10;
  let end = page * 10;

  return state.search.results.slice(start, end);
};
