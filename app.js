const express = require('express');
const exphbs = require('express-handlebars');
 

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true })); // New
app.use(express.json()); // New
// Static Files
app.use(express.static('public'));

// Templating Engine
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');



const homeroute = require('./server/routes/home');
const userroute = require('./server/routes/user');

app.use('/', homeroute);
app.use('/user', userroute);
 
app.listen(port, () => console.log(`Listening on port ${port}`));