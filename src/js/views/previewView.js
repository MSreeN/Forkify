import View from './view.js';

class PreviewView extends View {
  _parentElement = '';

  // _errorMessage = 'No results found for your query! Please try again';

  _generateMarkup(results) {
    const id = window.location.hash.slice(1);
    return ` 
        <li class="preview">
          <a class="preview__link ${
            results.id === id ? 'preview__link--active' : ''
          }" href="#${results.id}">
            <figure class="preview__fig">
              <img src="${results.image}" alt=${results.title} />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${results.title}</h4>
              <p class="preview__publisher">${results.publisher}</p>
              <div class="preview__user-generated">
              <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
              </div>
            </div>
          </a>
        </li>`;
  }
}

export default new PreviewView();
