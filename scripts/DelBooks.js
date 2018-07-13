var DelBooks = function() {
  Library.call(this);
  this.$container = $('#remove-book');
};

DelBooks.prototype = Object.create(Library.prototype);

DelBooks.prototype.init = function() {
  this._bindEvents();
  return;
};

DelBooks.prototype._bindEvents = function() {
  this.$container.find('#remove-books-button').on('click', $.proxy(this._removeFromTable, this));
};

DelBooks.prototype._removeFromTable = function() {
  var removeByTitle = this.$container.find('#remove-title-input'),
      titleInput = $(removeByTitle).val(),
      removeByAuthor = this.$container.find('#remove-author-input'),
      authorInput = $(removeByAuthor).val();
  this.removeBookByTitle(titleInput);
  this.removeBookByAuthor(authorInput);
  // this.$container.find('#remove-book-form')[0].reset();
  return;
};

$(function() {
  window.gDelBooks = new DelBooks();
  window.gDelBooks.init();
});