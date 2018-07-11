var DataTable = function() {
  Library.call(this);
  this.$container = $('#book-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this.getObject();
  this._updateTable();
  this._bindEvents();
  // this._bindCustomEvents();
};

DataTable.prototype._bindEvents = function() {
  // native events here, such as edit or delete
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
};

// DataTable.prototype._bindCustomEvents = function() {
  
// };

DataTable.prototype._updateTable = function() {
  this.$container.find('#book-table-body').empty();
  var _self = this;
  $.each(window.bookShelf, function(i, book) {
    _self._createRow(book);
  });
};

DataTable.prototype._createRow = function(book) {
  var tr = document.createElement('tr');
  var editRow = document.createElement('span', {'class':'glyphicon glyphicon-remove-circle'});
  var att = document.createAttribute('role', 'button');
  for (var key in book) {
    var td = document.createElement('td');
    $(td).text(book[key]);
    tr.append(td);
  };
  tr.append(document.createElement('td').append(editRow))
  return tr;
};

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});