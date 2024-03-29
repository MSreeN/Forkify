// import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    //we only change the dom elements that needs to be changed, reduces lot of friction when we update servings
    const newMarkup = this._generateMarkup();

    //we do the change by comparing the elements and comparison using string is difficult so we create dom element out of newMarkup
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((nEle, i) => {
      const curEle = curElements[i];
      //update servings
      if (
        !nEle.isEqualNode(curEle) &&
        nEle.firstChild?.nodeValue.trim() !== ''
      ) {
        curEle.textContent = nEle.textContent;
      }

      //replacing the elements attributes(we replaced text value but we still have attributes like servings dataset on element which we still need to update)
      if (!nEle.isEqualNode(curEle)) {
        // curEle.setAttribute(nEle.attributes);
        Array.from(nEle.attributes).forEach(attr =>
          curEle.setAttribute(attr.name, attr.value)
        );
      }
    });

    //looping through new Elements
    // newElements.forEach((newEl, i) => {});
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
    <use href="src/img/icons.svg#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `       <div class="error">
    <div>
      <svg>
      <use href="src/img/icons.svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}!</p>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `       <div class="message">
    <div>
      <svg>
      <use href="src/img/icons.svg#icon-smile"></use>
      </svg>
    </div>
    <p>${message}!</p>
  </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
