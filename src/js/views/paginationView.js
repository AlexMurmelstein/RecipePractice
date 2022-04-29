import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Page 1, other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNext(curPage);
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateBack(curPage);
    }
    //Some other page
    if (curPage < numPages) {
      return `${this._generateBack(curPage)} ${this._generateNext(curPage)}`;
    }
    //Page 1, NO other pages
    return '';
  }

  _generateBack(curPage) {
    return `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;
  }

  _generateNext(curPage) {
    return `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }
}

export default new PaginationView();
