var Book = function(title, author, numberOfPages, publishDate) {
  this.title = title;
  this.author = author;
  this.numberOfPages = parseInt(numberOfPages);
  this.publishDate = new Date(publishDate).getUTCFullYear();
};