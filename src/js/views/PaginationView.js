import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    //page 1 and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return 'page 1, others';
    }

    //last page
    if (this._data.page === numPages && numPages > 1) {
      return 'last page';
    }
    //other page

    if (this._data.page < numPages) {
      return 'other pages';
    }

    //page 1 and there are no other pages
    return 'there is only page 1';
  }
}

export default new PaginationView();
