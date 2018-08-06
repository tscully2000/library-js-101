var DataTable = function() {
  Library.call(this);
  this.$container = $('#book-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = async function() {
  await this._handleGetBook();
  this._handlePagination(1, window.bookShelf[0]._id, '=');
  this._bindEvents();
  this._bindCustomEvents();
};

DataTable.prototype._bindEvents = function() {
  this.$container.on('click', '.glyphicon-remove-circle', $.proxy(this._deleteRow, this));
  this.$container.on('blur', '[contenteditable]', $.proxy(this._editRow, this));
  $('#pages').on('click', '#prev-button', $.proxy(this._prevPagination, this))
  $('#pages').on('click', '#next-button', $.proxy(this._nextPagination, this));
  return;
};

DataTable.prototype._bindCustomEvents = function() {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
  return;
};

DataTable.prototype._prevPagination = async function() {
  var page = $('.current-page').text();
  page = parseInt(page) - 1;
  if (page === 1) { $('#prev-button').attr('disabled', true) };
  if (page >= 1) { 
    $('.current-page').text(page);
    $('#next-button').attr('disabled', false);
  }
  var lastId = window.bookShelf[0]._id, pagination = await this._handlePagination(page, lastId, '<');
  return pagination;
};

DataTable.prototype._nextPagination = async function() {
  var page = $('.current-page').text();
  page = parseInt(page) + 1;
  if (page > 1) { $('#prev-button').attr('disabled', false) };
  var lastId = window.bookShelf[window.bookShelf.length - 1]._id, pagination;
  if (window.bookShelf.length < 4) { 
    $('#next-button').attr('disabled', true);
    alert('There are no more books in the library!');
  } else {
    $('.current-page').text(page);
    pagination = await this._handlePagination(page, lastId, '>');
  }
  return pagination;
};

DataTable.prototype._updateTable = function() {
  var _self = this,
      $thead = this.$container.find('#book-table-head'),
      $tbody = this.$container.find('#book-table-body');
  $thead.empty();
  $tbody.empty();
  if (window.bookShelf.length > 0) {
    $thead.append(_self._createHeader());
    $.each(window.bookShelf, function(i, book) {
      $tbody.append(_self._createRow(book));
    });
  };
  return;
};

DataTable.prototype._createHeader = function() {
  var headers = ['Cover', 'Title', 'Author', 'Pages', 'Publish Date', 'Edit'],
      tr = document.createElement('tr');
  $.each(headers, function(i, header) {
    var th = document.createElement('th');
    $(th).text(header);
    tr.append(th);
  });
  return tr;
};

DataTable.prototype._createRow = function(book) {
  var tr = document.createElement('tr'),
      editTd = document.createElement('td'),
      editGlyph = document.createElement('span');
  $(tr).attr('data-id', book._id);
  $(editGlyph).addClass('glyphicon glyphicon-remove-circle btn');
  editTd.append(editGlyph);
  for (var key in book) {
    var td = document.createElement('td');
    if (key === '_id' || key === '__v') {
      // Do nothing
    } else if (key === 'cover') {
      var coverImg = document.createElement('img');
      $(coverImg).addClass('table-img');
      $(coverImg).attr('src', book.cover);
      $(td).append(coverImg);
      tr.append(td);
    } else {
      $(td).attr('contenteditable', 'true');
      $(td).addClass(key);
      $(td).text(book[key]);
      tr.append(td);
    };
  };
  tr.append(editTd);
  return tr;
};

DataTable.prototype._deleteRow = function(e) { 
  var $target = $(e.currentTarget).closest('tr');
  if (this.removeBookById($target.attr('data-id'))) {
    $target.remove();
    return true;
  } else {
    alert('Unable to remove book from library, please try again.');
  };
};

DataTable.prototype._editRow = function(e) {
  var id = $(e.currentTarget).closest('tr').attr('data-id'),
      editClass = $(e.currentTarget).attr('class'),
      editField = $(e.currentTarget).text(),
      editBook = this.editBookById(id);
  for (var key in editBook) {
    if (key === editClass) {
      editBook[key] = editField;
      this._handlePutBook(id, editBook);
    };
  };
};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});