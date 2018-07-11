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
  $('#add-remove').find('#add-book-button').on('click', $.proxy(this._handleModalOpen, this));
  this.$container.find('#queue-button').on('click', $.proxy(this._queueBooks, this));
  this.$container.find('#add-books-button').on('click', $.proxy(this._addToTable, this));
  return;
};

AddBooks.prototype._handleModalOpen = function() {
  this.$container.modal('show');
  return;
};

AddBooks.prototype._queueBooks = function() {
  var qBooks = this.$container.find('#add-book-form').serializeArray(),
      qBooksToAdd = {},
      hasVal = true;
  $.each(qBooks, function(i, book) {
    book.value ? qBooksToAdd[book.name] = book.value : hasVal = false;
  });
  hasVal ? this._tempBookShelf.push(new Book(qBooksToAdd.title, qBooksToAdd.author, qBooksToAdd.numberOfPages, qBooksToAdd.publishDate)) : alert('Error: Please fill out all form fields!');
  this.$container.find('.book-count').text(this._tempBookShelf.length);
  this.$container.find('#add-book-form')[0].reset();
  return;
};

AddBooks.prototype._createTableElements = function() {
  var tr = document.createElement('tr');
  $.each(window.bookShelf, function(i, book) {
    var td = document.createElement('td');
    $(td).text(book.title, book.author, book.numberOfPages, book.publishDate);
    tr.append(td);
  });
  return tr;
};

AddBooks.prototype._addToTable = function() {
  if (this.addBooks(this._tempBookShelf)) {
    $('#book-table').find('#book-table-body').html(this._createTableElements());
    this.$container.find('.book-count').text(0);
    this._tempBookShelf = [];
    this.$container.modal('hide');
  } else {
    alert('Please add a book to the queue');
  };
  return;
};

$(function() {
  window.gAddBooks = new AddBooks();
  window.gAddBooks.init();
});