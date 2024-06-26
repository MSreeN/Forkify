import View from './view.js';

// import icons from 'url:../../img/icons.svg';
// import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  // _data;
  // render(data) {
  //   this._data = data;
  //   const markup = this._generateMarkup();
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  // _clear() {
  //   this._parentElement.innerHTML = '';
  // }

  // renderSpinner() {
  //   const markup = `<div class="spinner">
  //   <svg>
  //     <use href="${icons}#icon-loader"></use>
  //   </svg>
  // </div>`;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  // renderError(message = this._errorMessage) {
  //   const markup = `       <div class="error">
  //   <div>
  //     <svg>
  //       <use href="${icons}#icon-alert-triangle"></use>
  //     </svg>
  //   </div>
  //   <p>${message}!</p>
  // </div>`;

  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  // renderMessage(message = this._message) {
  //   const markup = `       <div class="message">
  //   <div>
  //     <svg>
  //       <use href="${icons}#icon-smile"></use>
  //     </svg>
  //   </div>
  //   <p>${message}!</p>
  // </div>`;

  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  addHandlerRender(handler) {
    // controlRecipes();

    //loading the recipe whenever the hash changes
    // window.addEventListener('hashchange', controlRecipes);
    // if you paste the url in other tab it won't load the recipe because there is no hash change because hash was created when you pasted the url so website won't show the recipe
    // We should make use of load event that fires when page was loaded for the first time
    // we should use load event when url is pasted to other tab because hashchange event won't get fired as said above hash was created for the first time there and wasn't changed and we should use hashchange event when hash was changed in same tab, we can't use load event here because load event gets fired when page is loaded for first time and page was already loaded here

    // flow => user clicks on anchor tag => anchor tag changes has as set to href => when hash changes window fires hashchange event and executes code
    //looping through these 2 events right after code executes
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to =${
                this._data.servings - 1
              }>
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to=${
                this._data.servings + 1
              }>
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark${
                this._data?.bookmarked ? '-fill' : ''
              }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredient)
              .join('')}
          </ul>
        </div> 

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  _generateMarkupIngredient(ingredient) {
    return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">
              ${ingredient.quantity ? ingredient.quantity : ''}
              </div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>`;
  }
}

export default new RecipeView();
