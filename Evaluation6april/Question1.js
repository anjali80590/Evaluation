const cart = [
  { name: "Shirt", price: 25.99, quantity: 2, category: "Clothing" },
  { name: "Laptop", price: 999.99, quantity: 1, category: "Electronics" },
  { name: "Book", price: 12.5, quantity: 3, category: "Books" },
  { name: "Headphones", price: 49.99, quantity: 1, category: "Electronics" },
];

const originalTotal = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);


const withElectronicsDiscount = cart.map((item) => {
  if (item.category === "Electronics") {
    return { ...item, price: item.price * 0.9 };
  }
  return item;
});


const withBookDiscount = withElectronicsDiscount.map((item) => {
  if (item.category === "Books") {
    const freeItems = Math.floor(item.quantity / 3);
    return { ...item, quantity: item.quantity - freeItems };
  }
  return item;
});


const afterCategoryDiscounts = withBookDiscount.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);


const finalTotal =
  afterCategoryDiscounts > 1000
    ? afterCategoryDiscounts * 0.95
    : afterCategoryDiscounts;


console.log("Original cart total: $" + originalTotal.toFixed(2));
console.log("After category discounts: $" + afterCategoryDiscounts.toFixed(2));
console.log("Final total after all discounts: $" + finalTotal.toFixed(2));


