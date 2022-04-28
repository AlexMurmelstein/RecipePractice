import icons from 'url:../../img/icons.svg';
import View from './View';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(rec => this._generateMarkupPreview(rec)).join('');
  }

  _generateMarkupPreview(rec) {
    return `<li class="preview">
      <a class="preview__link" href="#${rec.id}">
        <figure class="preview__fig">
          <img src="${rec.image}" alt="${rec.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${rec.title}</h4>
          <p class="preview__publisher">${rec.publisher}</p>
        </div>
      </a>
    </li>`;
  }
}

export default new ResultsView();
