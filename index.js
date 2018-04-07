const express = require('express');

const parser = require('body-parser').urlencoded({ extended: false });
const { Singer } = require('./Singer');
const app = express();


app.locals.isDev = !process.env.PORT;

if (!process.env.PORT) {
    require('reload')(app);
}

app.use(parser);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Singer.find({})
    .then(singers => res.render('index', { singers }))
});

app.get('/remove/:id', (req, res) => {
    const { id } = req.params;
    Singer.findByIdAndRemove(id)
    .then(singer => {
        if (!singer) throw new Error('Cannot find singer.');
        res.redirect('/');
    })
    .catch(error => res.send(error.message));
});

app.get('/add', (req, res) => res.render('add'));

app.get('/update/:id', (req, res) => {
    Singer.findById(req.params.id)
    .then(singer => {
        if (!singer) throw new Error('Cannot find singer.');
        res.render('update', { singer });        
    })
    .catch(error => res.send(error.message));
});

app.post('/update/:id', (req, res) => {
    const { name, link, image } = req.body;
    Singer.findByIdAndUpdate(req.params.id, { name, link, image })
    .then(singer => {
        if (!singer) throw new Error('Cannot find singer.');
        res.redirect('/');        
    })
    .catch(error => res.send(error.message));
});

app.post('/add', (req, res) => {
    const { link, name, image } = req.body;
    const singer = new Singer({ name, link, image });
    singer.save()
    .then(() => res.redirect('/'))
    .catch(error => res.send(error.message));
});

app.listen(process.env.PORT || 3000, () => console.log('Server started!'));
