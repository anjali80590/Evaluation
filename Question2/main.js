const createInventoryManager=require('./inventoryManager')

const inventory = createInventoryManager();
inventory.addProduct("Table", "Furniture", 250, 2);
inventory.addProduct("Mouse", "Electronics", 40, 20);
inventory.addProduct("Keyboard", "Electronics", 60, 5);

console.log(inventory.getProducts());
console.log(inventory.getFilteredProducts("Furniture"));
console.log(inventory.getLowStockProducts());
console.log(inventory.getTotalInventoryValue());


// const inventory = createInventoryManager();
// inventory.addProduct("Laptop", "Electronics", 1200, 10);
// inventory.addProduct("Phone", "Electronics", 800, 3);
// inventory.addProduct("Chair", "Furniture", 100, 15);

// console.log(inventory.getProducts());
// console.log(inventory.getFilteredProducts("Electronics"));
// console.log(inventory.getLowStockProducts());
// console.log(inventory.getTotalInventoryValue());

