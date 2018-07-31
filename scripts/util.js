var bookShelf = [];

var bookify = function(books) {
  var tempArr = [];
  for (var i = 0; i < books.length; i++) {
    tempArr.push(new Book(books[i]));
  }
  return tempArr;
};