const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/singer1003')
.then(() => console.log('Database connected'))
.catch(() => process.exit(1));

const singerSchema = new mongoose.Schema({
    name: { type: String, trim: true, unique: true },
    link: { type: String, trim: true, unique: true },
    image: { type: String, trim: true, unique: true }
});

const Singer = mongoose.model('Singer', singerSchema);

module.exports = { Singer };

// Singer.find({})
// .then(x => console.log(x));

// Singer.insertMany([
//     { name: 'Karik', link: 'https://mp3.zing.vn/nghe-si/Karik', image: 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/a/0/a0927398989d4c5b18c56880bd56442b_1509531352.jpg' },
//     { name: 'Đức Phúc', link: 'https://mp3.zing.vn/nghe-si/Duc-Phuc', image: 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/d/7/d7f34aa6b1112e4b605f6c6e7eccd162_1509437674.jpg' },
//     { name: 'Châu Khải Phong', link: 'https://mp3.zing.vn/nghe-si/Chau-Khai-Phong', image: 'https://zmp3-photo.zadn.vn/thumb/240_240/avatars/c/a/ca59799621e1c9fd8652cd947713acfa_1509951552.jpg' },
// ])
// .then(x => console.log(x));
