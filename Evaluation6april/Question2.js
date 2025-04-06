function LibraryItem(title, author) {
  this.title = title;
  this.author = author;
  this.checkedOutBy = null;
}

LibraryItem.checkedOutItems = [];

LibraryItem.prototype.checkOut = function (userId) {
  this.checkedOutBy = userId;
  LibraryItem.checkedOutItems.push(this);
  console.log(`${this.title} has been checked out by ${userId}`);
};

LibraryItem.prototype.returnItem = function () {
  this.checkedOutBy = null;
  LibraryItem.checkedOutItems = LibraryItem.checkedOutItems.filter(
    (item) => item !== this
  );
};

LibraryItem.getCheckedOutItems = function () {
  return LibraryItem.checkedOutItems.map((item) => ({
    title: item.title,
    author: item.author,
    checkedOutBy: item.checkedOutBy,
  }));
};

function Book(title, author) {
  LibraryItem.call(this, title, author);
  this.type = "Book";
}
Book.prototype = Object.create(LibraryItem.prototype);

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald");

book1.checkOut("User123");
book1.returnItem();
book1.checkOut("User456");

console.log(
  "Current status:",
  book1.checkedOutBy ? "checked out" : "available"
);
console.log("All checked out items:", LibraryItem.getCheckedOutItems());
