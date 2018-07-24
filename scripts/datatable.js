var DataTable = function() {
  Library.call(this);
  this.$container = $('#book-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this._handleGetBook();
  this._bindEvents();
  this._bindCustomEvents();
};

DataTable.prototype._bindEvents = function() {
  this.$container.on('click', '.glyphicon-remove-circle', $.proxy(this._deleteRow, this));
  this.$container.on('blur', '[contenteditable]', $.proxy(this._editRow, this));
  return;
};

DataTable.prototype._bindCustomEvents = function() {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
  return;
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
  var $target = $(e.currentTarget).closest('tr').attr('data-id'),
      editField = $(e.currentTarget).text();
  this.editBookById($target);
};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});