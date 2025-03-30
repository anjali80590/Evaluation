
function createOrderManager(){
    let orders=[];
    return{
        addOrder(order){
            if(!order.id||typeof order.id!=='string'){
                throw new Error("order must have a valid string id")
            }
            if(!Array.isArray(order.items)){
                throw new Error("order items must have been array")
            }
            if(!['delivered','cancelled','created'].includes(order.status)){
                throw new Error("order must have status")
            }
            if(!(order.createAt instanceof Date)){
                throw new Error("order must have valid date")
            }
            order.push(order)
        },
        updateOrder(id,updatedfield){
            const orderIndex=orders.findIndex(order=>order.id==id);
            if(orderIndex===-1){
                throw new Error("order with id not found")
            }
            orders[orderIndex]={...orders[orderIndex],...updatedfield}
        }
    }
}

const manager = createOrderManager();
manager.addOrder({ id: 1, customerName: "Alice", items: [{ name: "Laptop", price: 1000, quantity: 1 }], status: "pending", createdAt: new Date("2024-03-01") });
manager.addOrder({ id: 2, customerName: "Bob", items: [{ name: "Phone", price: 500, quantity: 2 }], status: "shipped", createdAt: new Date("2024-03-02") });
console.log(manager.filterOrders("pending"));


