var AddBooks = function() {
  Library.call(this);
  this._tempBookShelf = [];
  this.$container = $('#add-book');
};

AddBooks.prototype = Object.create(Library.prototype);

AddBooks.prototype.init = function() {
  this._bindEvents();
  return;
};

AddBooks.prototype._bindEvents = function() {
  this.$container.find('#queue-button').on('click', $.proxy(this._queueBooks, this));
  this.$container.find('#add-books-button').on('click', $.proxy(this._addToTable, this));
  return;
};

AddBooks.prototype._queueBooks = function() {
  var qBooks = this.$container.find('#add-book-form').serializeArray(),
      qBooksToAdd = {},
      hasVal = true;
  $.each(qBooks, function(i, book) {
    book.value ? qBooksToAdd[book.name] = book.value : hasVal = false;
  });
  this.checkForDup(qBooksToAdd) && hasVal ? this._tempBookShelf.push(new Book(qBooksToAdd)) : alert('Existing title or empty input field');
  this.$container.find('.book-count').text(this._tempBookShelf.length);
  this.$container.find('#add-book-form')[0].reset();
  return;
};


AddBooks.prototype._addToTable = function() {
  if (this.addBooks(this._tempBookShelf)) {
    this.$container.find('.book-count').text(0);
    this._tempBookShelf = [];
  } else {
    alert('Please add a book to the queue');
  };
  return;
};

$(function() {
  window.gAddBooks = new AddBooks();
  window.gAddBooks.init();
});