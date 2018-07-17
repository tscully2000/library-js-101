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
  this.$container.on('hidden.bs.modal', $.proxy(this._resetForm, this));
};

DelBooks.prototype._removeFromTable = function(e) {
  var removeByAuthor = this.$container.find('#remove-author-input'),
      authorInput = $(removeByAuthor).val();
  if (this.removeBookByAuthor(authorInput)) {
    this._resetForm();
  } else {
    this._resetForm();
    alert('No matches found!');
    e.stopPropagation();
  };
  return;
};

DelBooks.prototype._resetForm = function() {
  this.$container.find('#remove-book-form')[0].reset();
  return;
};

$(function() {
  window.gDelBooks = new DelBooks();
  window.gDelBooks.init();
});