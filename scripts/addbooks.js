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
  this.$container.on('hidden.bs.modal', $.proxy(this._resetForm, this));
};

AddBooks.prototype._queueBooks = function() {
  var _self = this,
      qBooks = this.$container.find('#add-book-form').serializeArray(),
      qBooksToAdd = {},
      hasVal = true,
      file = $('#cover-input')[0].files[0],
      reader  = new FileReader();
  if (qBooks && file) {
    reader.onload = function() {
      qBooks.push({name: 'cover', value: reader.result});
      $.each(qBooks, function(i, book) {
        book.value ? qBooksToAdd[book.name] = book.value : hasVal = false;
      });
      if (_self.checkForDup(qBooksToAdd) && hasVal) {
        _self._tempBookShelf.push(qBooksToAdd);
        _self.$container.find('.book-count').text(_self._tempBookShelf.length);
        _self._resetForm();
      } else {
        alert('Existing title or empty input field');
      }
    };
    reader.readAsDataURL(file);
  } else {
    alert('Empty input field');
  }
  return;
};

AddBooks.prototype._addToTable = function(e) {
  var _self = this;
  this.addBooks(this._tempBookShelf).then(function(data) {
    if (data.insertedCount) {
      _self.$container.find('.book-count').text(0);
      _self._tempBookShelf = [];
    } else {
      alert('Please add a book to the queue');
      e.stopPropagation();
    }
  });
  return;
};

AddBooks.prototype._resetForm = function() {
  this.$container.find('#add-book-form')[0].reset();
  return;
};

$(function() {
  window.gAddBooks = new AddBooks();
  window.gAddBooks.init();
});