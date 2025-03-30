function createOrderManager() {
  let orders = [];

  return {
    addOrder(order) {
      orders.push(order);
    },
    updateOrder(id, newStatus) {
      const order = orders.find((order) => order.id === id);
      if (order) order.status = newStatus;
    },
    filterOrders(status) {
      return orders.filter((order) => order.status === status);
    },
    sortOrders(by) {
      return [...orders].sort((a, b) => {
        if (by === "date") return new Date(a.createdAt) - new Date(b.createdAt);
        if (by === "status") return a.status.localeCompare(b.status);
      });
    },
    getTotalRevenue() {
      return orders.reduce((total, order) => {
        return (
          total +
          order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );
      }, 0);
    },
    exportOrders() {
      return JSON.stringify(orders, null, 2);
    },
  };
}

const manager = createOrderManager();
manager.addOrder({
  id: 1,
  customerName: "Alice",
  items: [{ name: "Laptop", price: 1000, quantity: 1 }],
  status: "pending",
  createdAt: new Date("2024-03-01"),
});
manager.addOrder({
  id: 2,
  customerName: "Bob",
  items: [{ name: "Phone", price: 500, quantity: 2 }],
  status: "shipped",
  createdAt: new Date("2024-03-02"),
});

console.log(manager.filterOrders("pending"));
console.log(manager.getTotalRevenue());
console.log(manager.exportOrders());
