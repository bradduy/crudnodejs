const express = require('express');
const cookieParser = require('cookie-parser');
const upload = require('./uploadConfig');
const { sign, verify } = require('./jwt');
const { hash, compare } = require('bcrypt');
const User = require('./models/user.model');
const { Product } = require('./models/product.model');
const { UserModel } = require('./models/user.model')
const parser = require('body-parser').urlencoded({ extended: false });

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(parser);
app.use(cookieParser());

const redirectIfLoggedIn = (req, res, next) => {
    if (!req.cookies.token) return next();
    verify(req.cookies.token)
    .then(() => res.redirect('/'))
    .catch(() => {
        res.clearCookie('token');
        next();
    })
}

app.get('/', (req, res) => {
    if (!req.cookies.token) return res.redirect('/login');
    verify(req.cookies.token)
    .then(obj => User.findById(obj._id))
    .then(user => {
        if (!user) throw new Error('Cannot find user.');
        Product.find({})
    .then(products => res.render('dashboard', { products }))
    })
    .catch(err => res.clearCookie('token').redirect('/login'));
});

app.post('/login', parser, (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(user => sign({ _id: user._id }))
    .then(token => res.cookie('token', token).redirect('/'))
    .catch(err => res.send('Dang nhap that bai.'));
});

app.get('/signup', redirectIfLoggedIn, (req, res) => {
    res.render('signup');
});

app.get('/login', redirectIfLoggedIn, (req, res) => {
    res.render('login');
 });

 app.post('/signup', (req, res) => {
    upload.single('avatar')(req, res, err => {
        const { name, email, password, phone } = req.body;
        const avatar = req.file ? req.file.filename : 'default.png';
        User.signUp(email, password, name, phone, avatar)
            .then(user => res.send('Dang ky thanh cong'))
            .catch(err => res.send('Dang ky that bai'));
    });
});


//##########################################
// app.get('/', (req, res) => {
//     Product.find({})
//     .then(products => res.render('dashboard', { products }))
// });

app.get('/remove/:id', (req, res) => {
    if (!req.cookies.token) return res.redirect('/login');
    verify(req.cookies.token)
    .then(obj => User.findById(obj._id))
    .then(user => {
        if (!user) throw new Error('Cannot find user.');
        const { id } = req.params;
        Product.findByIdAndRemove(id)
        .then(product => {
            if (!product) throw new Error('Cannot find product.');
            res.redirect('/');
        })
    })
    .catch(error => res.send(error.message));
});

app.get('/add', (req, res) => {
    if (!req.cookies.token) return res.redirect('/login');
    verify(req.cookies.token)
    .then(obj => User.findById(obj._id))
    .then(user => {
        if (!user) throw new Error('Cannot find user.');
        return res.render('add')      
    })
    .catch(error => res.send(error.message));
});

app.get('/update/:id', (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        if (!product) throw new Error('Cannot find product.');
        res.render('update', { product });        
    })
    .catch(error => res.send(error.message));
});

app.post('/update/:id', (req, res) => {
    const { name, price } = req.body;
    Product.findByIdAndUpdate(req.params.id, { name, price })
    .then(product => {
        if (!product) throw new Error('Cannot find product.');
        res.redirect('/');        
    })
    .catch(error => res.send(error.message));
});

app.post('/add', (req, res) => {
    const { name, price } = req.body;
    const product = new Product({ name, price });
    product.save()
    .then(() => res.redirect('/'))
    .catch(error => res.send(error.message));
});

app.listen(process.env.PORT || 3000, () => console.log('Server started!'));
