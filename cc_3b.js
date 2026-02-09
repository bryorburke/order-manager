// Inventory Model
let inventory = [
    { sku: "SKU-001", name: "Butter Kitty", price: 19.99, stock: 42},
    { sku: "SKU-002", name: "Ganglean Cyst", price: 25.50, stock: 15},
    { sku: "SKU-003", name: "Orange Peel", price: 89.99, stock: 8},
    { sku: "SKU-004", name: "Fungus Spore", price: 12.00, stock: 3}
]

console.log("Initial Inventory Summary")
for (let i = 0; i < inventory.length; i++) {
    let item = inventory[i];
    console.log(item.sku + " | " + item.name + " | $" + item.price.toFixed(2) + " | Stock: " + item.stock);
}

// Add new product
inventory.push({ sku: "SKU-005", name: "Medjool Date", price: 15.00, stock: 20})

// Remove last product
let lastItem = inventory.pop();
console.log("\nRemoved Item from list: " + lastItem.name);

// Update price and stock
inventory[0].price = 14.99; // Butter Kitty
inventory[3].stock = inventory[3].stock + 10; // Fungus Spore

// Create and process orders
let orders = [
    { 
        orderId: "ORD-101",
        items: [{ sku: "SKU-001", qty: 2}, {sku: "SKU-003", qty:1}]
    },
    {
        orderId: "ORD-102",
        items: [{ sku: "SKU-004", qty:50}] // Should fail because of insufficient stock
    }
];

function processOrder(order) {
    let total = 0;

    for (let i = 0; i < order.items.length; i++) {
        let orderItem = order.items[i];
        let foundProduct = null;

        for (let j = 0; j < inventory.length; j++) {
            if (inventory[j].sku === orderItem.sku) {
                foundProduct = inventory[j];
            }
        }
        if (foundProduct === null || foundProduct.stock < orderItem.qty) {
            return "Order" + order.orderId + "Error: Not enough stock for " + orderItem.sku;
        }
    }
    for (let i = 0; i < order.items.length; i++) {
        let orderItem = order.items[i];
        for (let j=0; j < inventory.length; j++) {
            if (inventory[j].sku === orderItem.sku) {
                inventory[j].stock -= orderItem.qty;
                total += (inventory[j].price * orderItem.qty);
        }
    }
    return "Order " + order.orderId + " Success! Total: $" + total.toFixed(2);
}
console.log("\n--- Order Results ---");
for (let k = 0; k < orders.length; k++) {
    console.log(processOrder(orders[k]));
}

// Reporting Insights
let grandTotalValue = 0;
for (let i = 0; i < inventory.length; i++) {
    grandTotalValue += (inventory[i].price * inventory[i].stock);
}
console.log("\nTotal Value of All Stock: $" + grandTotalValue.toFixed(2));

let lowStockList = [];
for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].stock <= 5) {
        lowStockList.push(inventory[i]);
    }
}
console.log("Items to Restock:", lowStockList);
// Create a simple price list strings
let simplePrices = [];
for (let i = 0; i < inventory.length; i++) {
    let entry = inventory[i].sku + " — $" + inventory[i].price;
    simplePrices.push(entry);
}
console.log("Price List:", simplePrices)}
