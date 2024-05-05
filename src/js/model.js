import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON, sendJson } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const response = await getJSON(`${API_URL}${id}`);
    // const recipe = await data.json();
    const { recipe } = response.data;
    console.log(recipe);
    state.recipe = createRecipeObject(recipe);
    if (state.bookmarks?.some(bookmark => recipe.id === bookmark.id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
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
    state.search.page = 1;
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
    //Fraction ingredients
    //formula for newIngredientQuantity: (newServing * OldIngredientQuantity) / oldServing
    ingredient.quantity = (
      (ingredient.quantity * newServings) /
      state.recipe.servings
    ).toFixed(2);
  });
  state.recipe.servings = newServings;
}
export const controlBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  console.log(state.bookmarks);
};

export const addBookmark = function (recipe) {
  //add bookmark
  state.bookmarks.push(recipe);

  //mark current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  controlBookmarks();
};

export const deleteBookmark = function (id) {
  const recipeIndex = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(recipeIndex, 1);

  state.recipe.bookmarked = false;
  controlBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log('newRecipe', newRecipe);
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient-') && entry[1] !== '')
      .map(ingredient => {
        const ing = ingredient[1].replaceAll(' ', '').split(',');
        if (ing.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format'
          );
        const [quantity, unit, description] = ing;

        return {
          quantity: quantity ? +quantity : null,
          unit: unit ? unit : '',
          description: description ? description : '',
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    console.log(recipe);
    const apiResponse = await sendJson(`${API_URL}`, recipe);
    const userRecipeResponse = createRecipeObject(apiResponse.data.recipe);
    state.recipe = userRecipeResponse;
    console.log(state.recipe);
    state.recipe.bookmarked = true;
    addBookmark(state.recipe);
    console.log(apiResponse);
  } catch (err) {
    throw err;
  }
  // const ingredients = newRecipe.map((recipe, i) => {

  // })
};

const init = function () {
  const bookmarksData = JSON.parse(localStorage.getItem('bookmarks'));
  state.bookmarks = bookmarksData ? bookmarksData : [];
};

init();
