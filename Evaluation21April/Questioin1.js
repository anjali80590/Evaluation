let stores=[
  { storeName: "Store A", location: "City 1", sales: [100, 200, 150, 180] },
  { storeName: "Store B", location: "City 2", sales: [200, 250, 300, 150] },
  { storeName: "Store C", location: "City 3", sales: [50, 70, 120, 80] }
]

// total sales for each store 
stores.forEach(store=>{
    let total=store.sales.reduce((sum,sale)=>sum+sale);
    console.log(`${store.storeName} : ₹${total}`);
    store.totalSales=total;
})

// highest store
let Highest=stores.reduce((max,store)=>store.totalSales>max.totalSales?store:max)
console.log(
  `store  with highest sales : ${Highest.storeName} (₹${Highest.totalSales})`
);

// low store less than 1000
let newstore=[]
let lowstore=stores.filter((store)=>{
    if(store.totalSales<1000){
        newstore.push(store.storeName)
    }
});
console.log('store with low sales :',newstore)



// Problem : Create the Layout

// Create the Homepage layout of WHO website : https://www.who.int/

// You can get the images either from inspect section or use dummy images from picsum.com

// Ensure that layout is as similar as possible.