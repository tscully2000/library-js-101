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

DelBooks.prototype._removeFromTable = function(e) {
  var removeByAuthor = this.$container.find('#remove-author-input'),
      authorInput = $(removeByAuthor).val(),
      clearField = this.$container.find('#remove-book-form')[0].reset();
  if (this.removeBookByAuthor(authorInput)) {
    clearField;
  } else {
    alert('No matches found!');
    clearField;
    e.stopPropagation();
  };
  return;
};

$(function() {
  window.gDelBooks = new DelBooks();
  window.gDelBooks.init();
});