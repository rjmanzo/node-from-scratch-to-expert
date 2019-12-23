 const express = require('express');
 var app = express();

 var hbs = require('hbs');
 //load helpers
 require('./hbs/helpers');

 //serving static (will load as default the index)
 app.use(express.static(__dirname + '/public'));

 //load partials
 hbs.registerPartials(__dirname + '/views/partials');


 //set Handlebars engine
 app.set('view engine', 'hbs');

 //render views
 app.get('/', (req, res) => {
     //res.send('Hello World')

     //render the html created on the views folders
     res.render('home', {
         tabname: 'Home',
         nombre: 'Home'
     });
 });

 app.get('/about', (req, res) => {

     //render the html created on the views folders
     res.render('about', {
         tabname: 'about',
         nombre: 'about',
     });
 })

 app.listen(3000, () => {
     console.log("Escuchando en el puerto 3000");
 });