var DataTable = function() {
  Library.call(this);
  this.$container = $('#book-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this.getObject();
  this._updateTable();
  this._bindEvents();
  this._bindCustomEvents();
};

DataTable.prototype._bindEvents = function() {
  this.$container.on('click', '.glyphicon-remove-circle', $.proxy(this._deleteRow, this));
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
      // book = window.bookShelf[0];
  // for (var key in book) {
  //   var th = document.createElement('th');
  //   $(th).text(key);
  //   tr.append(th);
  // };
  // var editTh = document.createElement('th');
  // $(editTh).text('Edit');
  // tr.append(editTh);

DataTable.prototype._createRow = function(book) {
  var tr = document.createElement('tr'),
      editTd = document.createElement('td'),
      editGlyph = document.createElement('span');
  tr.setAttribute('data-id', book.title);
  $(editGlyph).addClass('glyphicon glyphicon-remove-circle btn');
  editTd.append(editGlyph);
  for (var key in book) {
    var td = document.createElement('td');
    $(td).text(book[key]);
    tr.append(td);
  };
  tr.append(editTd);
  return tr;
};

DataTable.prototype._deleteRow = function(e) { 
  var $target = $(e.currentTarget).closest('tr');
  if (this.removeBookByTitle($target.attr('data-id'))) {
    $target.remove();
    return true;
  } else {
    alert('Unable to remove book from library. Please try again.')
  };
  return;
};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});