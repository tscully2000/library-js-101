var SearchBar = function() {
  Library.call(this);
  this.$container = $('#search-form');
};

SearchBar.prototype = Object.create(Library.prototype);

SearchBar.prototype.init = function() {
  this._bindEvents();
  return;
};

SearchBar.prototype._bindEvents = function() {
  this.$container.on('submit', $.proxy(this._searchTable, this));
  return;
};

SearchBar.prototype._searchTable = async function(e) {
  e.preventDefault();
  var searchInput = this.$container.find('#search-bar').val(),
      handleSearch = await this._handleSearch(searchInput);
  return handleSearch;
};

$(function() {
  window.gSearchBar = new SearchBar();
  window.gSearchBar.init();
});