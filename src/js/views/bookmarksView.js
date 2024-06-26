import PreviewView from './previewView.js';
import View from './view.js';

class BookmarksView extends View {
  _bookmarkHandler(handler) {
    window.addEventListener('load', handler);
  }
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(PreviewView._generateMarkup).join('');
  }
}

export default new BookmarksView();
