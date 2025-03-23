const createLibraryManager=require('./libraryManager')

const library = createLibraryManager();
library.addBook(
  1,
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  "Fiction",
  3,
  5,
  [5, 4, 5]
);
library.addBook(2, "1984", "George Orwell", "Dystopian", 0, 7, [4, 5, 5]);
library.addBook(
  3,
  "To Kill a Mockingbird",
  "Harper Lee",
  "Fiction",
  5,
  6,
  [3, 4, 2]
);

console.log(library.getBookDetails(2));
console.log(library.getOutOfStockBooks());
console.log(library.getCategoryBreakdown());
// console.log(library.getTopRatedBook());
// console.log(library.getSortedBooks());
// console.log(library.getLowRatedBooks());

