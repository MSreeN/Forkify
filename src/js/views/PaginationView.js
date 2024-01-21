import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
    });
    handler();
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numPages);
    //page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `<button class="btn--inline pagination__btn--next">
      <span>page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //last page
    if (currPage === numPages && numPages > 1) {
      return `<!-- <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span>page ${currPage - 1}</span>
    </button>`;
    }
    //other page

    if (currPage < numPages) {
      return `<!-- <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-left"></use>
      </svg>
      <span>page ${currPage - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next">
      <span>page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
