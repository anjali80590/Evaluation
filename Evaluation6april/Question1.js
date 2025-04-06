// Problem Statement
// Read carefully and implement the solution

// Problem: Shopping Cart Discount Calculator

// Implement a function that applies different discount strategies to a shopping cart. 
// Use Higher Order Functions to create reusable discount calculators that can be combined.

// Input:

// Cart items: [
//   { name: "Shirt", price: 25.99, quantity: 2, category: "Clothing" },
//   { name: "Laptop", price: 999.99, quantity: 1, category: "Electronics" },
//   { name: "Book", price: 12.50, quantity: 3, category: "Books" },
//   { name: "Headphones", price: 49.99, quantity: 1, category: "Electronics" }
// ]

// Discount strategies:
// - 10% off Electronics
// - Buy 2 get 1 free for Books
// - 5% off total if cart > $1000

// Expected Output:

// Original cart total: $1176.46
// After category discounts: $1078.96
// Final total after all discounts: $1025.01

// Problem: Library Management System

// Implement a simple library management system using constructor functions and inheritance. Create a base class LibraryItem with common properties, and derived classes Book, DVD, and Magazine with specific properties and methods.

// Input:

// // Creating new library items
// const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, "Fiction", "9780743273565");
// const dvd1 = new DVD("Inception", "Christopher Nolan", 148, "Science Fiction", "PG-13");
// const magazine1 = new Magazine("National Geographic", "Various", 80, "Science", "April 2023", "Monthly");

// // Check out and return operations
// book1.checkOut("User123");
// book1.returnItem();
// book1.checkOut("User456");

// // Get all checked out items
// const checkedOutItems = LibraryItem.getCheckedOutItems();

// Expected Output:

// [Book] The Great Gatsby has been checked out by User456
// Current status: checked out
// All checked out items: [
//   {
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     type: "Book",
//     checkedOutBy: "User456"
//   }
// ]

let CartItems= [
  { name: "Shirt", price: 25.99, quantity: 2, category: "Clothing" },
  { name: "Laptop", price: 999.99, quantity: 1, category: "Electronics" },
  { name: "Book", price: 12.50, quantity: 3, category: "Books" },
  { name: "Headphones", price: 49.99, quantity: 1, category: "Electronics" }
]
  function CalucalteCartTotal(items){
    let total=0;
    for(let item of items){
        total+=item.price*item.quantity
    }
    return total;
  }
  function applyelectronicdiscount(items){
    let updatedItems=[];
    for(let item of items){
        let updatedItems={...items};
        if(item.category=="Electronics"){
            updatedItems.price=item.price*0.9;
        }
        updatedItems.push(updatedItem)
    }
  }