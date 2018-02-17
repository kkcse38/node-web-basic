
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
//app.use(express.static(__dirname + '/views'));

//Middleware
app.use((req, res, next)=>{
    //After calling next() middleware allow to response to serverr
    var date = new Date().toString();
    var log = `${req.method}: ${req.url}`;
    fs.appendFile('server.log', log+ '\n', (error)=>{
        if(error)
            console.log('Unable to append to server log');
    });
    next();
});

app.use((req, res, next)=>{
    res.render('maintenance.hbs');
});

//After writing this statement here, It makes the views file private and not allowed to execute after render
app.use(express.static(__dirname + '/views'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (message)=>{
    //message = "kk";
    return message.toUpperCase();
});
//Set http rout handelors.
//took two arguments
//First - url
//Second - Function, which tell what to return as a response
app.get('/', (req, res)=>{
    var heck = {
        pageTitle : 'Hello Express, You are Awesome',
        location : res.location,
       // currentYear: new Date().getFullYear(),
        url: req.url,
        welcomeMessage: 'welcome message',
        likes : [
            'coding',
            'tetsing',
        ]
    };
    //res.send(heck);
    res.render('home.hbs', heck);
});

app.get('/about', (req, res)=>{
    //res.send('About');
    res.render('about.hbs', {
        pageTitle: 'About hbs page!',
       //currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        error: '404',
        status: 'Not Found'
    });
});

//We do need to listen app.get by app.listen method
app.listen(port, ()=>{
    console.log(`Server listen on port ${port}`);
});