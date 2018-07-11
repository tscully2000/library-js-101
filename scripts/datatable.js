var DataTable = function() {
  Library.call(this);
  this.$container = $('#book-table');
};

DataTable.prototype = Object.create(Library.prototype);

DataTable.prototype.init = function() {
  this.getObject();
  this._updateTable();
  // this._bindEvents();
  this._bindCustomEvents();
};

DataTable.prototype._bindEvents = function() {
//  Native shiz hurrrr
};

DataTable.prototype._bindCustomEvents = function() {
  $(document).on('objUpdate', $.proxy(this._updateTable, this));
};

DataTable.prototype._updateTable = function() {
  var _self = this,
      $thead = this.$container.find('#book-table-head'),
      $tbody = this.$container.find('#book-table-body');
  $thead.empty();
  $tbody.empty();
  $thead.append(_self._createHeader());
  $.each(window.bookShelf, function(i, book) {
    $tbody.append(_self._createRow(book));
  });
};

DataTable.prototype._createHeader = function() {
  var tr = document.createElement('tr'),
      th1 = document.createElement('th'),
      th2 = document.createElement('th'),
      th3 = document.createElement('th'),
      th4 = document.createElement('th'),
      th5 = document.createElement('th'),
      th6 = document.createElement('th');
  $(th1).text('Cover');
  $(th2).text('Title');
  $(th3).text('Author');
  $(th4).text('Pages');
  $(th5).text('Publish Date');
  $(th6).text('Edit');
  tr.append(th1, th2, th3, th4, th5, th6);
  return tr;
      // book = window.bookShelf[0];
  // for (var key in book) {
  //   var th = document.createElement('th');
  //   $(th).text(key);
  //   tr.append(th);
  // };
  // var editTh = document.createElement('th');
  // $(editTh).text('Edit');
  // tr.append(editTh);
};

DataTable.prototype._createRow = function(book) {
  var tr = document.createElement('tr'),
      editTd = document.createElement('td'),
      editGlyph = document.createElement('span');
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

$(function() {
  window.gDataTable = new DataTable();
  window.gDataTable.init();
});