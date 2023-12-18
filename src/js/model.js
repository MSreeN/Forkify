import { API_URL } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
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
    const response = await getJSON(`${API_URL}?search=${query}`);
    console.log(response.data.recipes);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

loadSearchResults('pizza');
