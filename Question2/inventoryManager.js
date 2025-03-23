const createInventoryManager=()=>{
    let products=[];
    return{
        addProduct(name,category,price,quantity){
            products.push({name,category,price,quantity});
            return this;
        },
        updateProduct(name,newDetails){
            products=products.map(product=>product.name===name?{...product,...newDetails}:product);
            return this;
        }
        ,
        getProducts(){
            return products;
        }
        ,
        getProductsNames(){
            return products.map(product=>product.name)
        }
        ,
        getFilteredProducts
        (category){
            return products.filter(product=>product.category===category);
        },
        getLowStockProducts(){
            return products.filter(product=>product.quantity<5);
        },
        getTotalInventoryValue(){
            return products.reduce((total,product)=>total+product.price*product.quantity,0)
        },
        sortProductsByPrice(){
            products.sort((a,b)=>a.price-b.price);return this;
        }
    }
}
module.exports= createInventoryManager;