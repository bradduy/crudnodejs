const express = require('express');
const reload = require('reload');

const parser = require('body-parser').urlencoded({ extended: false });

const app = express();

app.use(parser);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { singers: [] });
});

app.get('/remove/:id', (req, res) => {
    const { id } = req.params;
    // res.redirect('/');
});

app.get('/add', (req, res) => res.render('add'));

app.get('/update/:id', (req, res) => {
    // res.render('update', { singer });
});

app.post('/update/:id', (req, res) => {
    const { name, link, image } = req.body;
    // res.redirect('/');
});

app.post('/add', (req, res) => {
    const { link, name, image } = req.body;
    // res.redirect('/');
});

app.listen(3000, () => console.log('Server started!'));
reload(app);
