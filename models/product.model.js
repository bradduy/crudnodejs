const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/meanjwt')
    .then(() => console.log('Database connected'))
    .catch(() => process.exit(1));

const productSchema = new mongoose.Schema({
    name: { type: String, trim: true, unique: true },
    price: { type: Number, trim: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };

// Product.find({})
// .then(x => console.log(x));

// Product.insertMany([
//     { name: 'Book', price: 10 },
//     { name: 'Can', price: 5 },
//     { name: 'Shoes', price: 8 },
// ])
//     .then(x => console.log(x));

