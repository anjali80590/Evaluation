const cart = [
  { name: "Shirt", price: 25.99, quantity: 2, category: "Clothing" },
  { name: "Laptop", price: 999.99, quantity: 1, category: "Electronics" },
  { name: "Book", price: 12.5, quantity: 3, category: "Books" },
  { name: "Headphones", price: 49.99, quantity: 1, category: "Electronics" },
];

function getTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function applyCategoryDiscount(cart) {
  return cart.map((item) => {
    if (item.category === "Electronics") {
      item.price *= 0.9; 
    }
    return item;
  });
}

function applyBuy2Get1Free(cart) {
  return cart.map((item) => {
    if (item.category === "Books" && item.quantity >= 3) {
      const freeItems = Math.floor(item.quantity / 3);
      item.quantity -= freeItems;
    }
    return item;
  });
}

function applyCartDiscount(total) {
  return total > 1000 ? total * 0.95 : total; 
}

const originalTotal = getTotal(cart);
const afterCategory = getTotal(applyCategoryDiscount([...cart]));
const afterBooks = getTotal(applyBuy2Get1Free([...cart]));
const finalTotal = applyCartDiscount(afterCategory);

console.log("Original cart total: $" + originalTotal.toFixed(2));
console.log("After category discounts: $" + afterCategory.toFixed(2));
console.log("Final total after all discounts: $" + finalTotal.toFixed(2));
