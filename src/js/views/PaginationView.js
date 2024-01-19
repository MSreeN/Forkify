import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = this._data.results.length / this._data.resultsPerPage;
    console.log(this._data.results);
    console.log(numPages);
    //page 1 and there are other pages

    //page 1 and there are no other pages

    //last page

    //other page
  }
}

export default new PaginationView();
