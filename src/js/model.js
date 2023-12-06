export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await response.json();
    let recipe = data.data.recipe;
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    alert(error);
  }
};
