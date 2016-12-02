const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/bookData');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected')
});
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  name:  String,
  type: String,
  description:   String,
  acquired: String
});

var Book = mongoose.model('bookDetails', bookSchema, 'bookDetails');

//view engine setup - used to link the html page to the index.js
// app.set('view engine', '.ejs or jade/pug hbs handlebass, ');
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// to link the css file
app.use(express.static('static'));
app.use(express.static('static'));
app.get('/:name', (req, res) => {
    var newBook = new Book({ name: req.params.name });
    newBook.save((err, firstResponse) => {


    // console.log(newBook,'did you get created')
    Book.find((err, response) =>  {
        console.log(err, response, 'do we have what it takes')
         res.render("index.ejs",  { sendNameToTemplate: name, sendSampleBooksToTemplate: response });
    })
});
    //hard-coded data entry
    const name = "Sample Book Inventory";
   // //  const sampleBooks = ['harry porter', 'hardlye chase', 'sydney sheldon']
   //  const sampleBooks = [
   //  {name: 'harry porter', description: 'a very interesting novel', bookType: 'story for kids', acquiredDate: '1999'},
   //  {name: 'hardley chase', description: 'another interesting novel', bookType: 'story for adults', acquiredDate: '2005'},
   //  {name: 'sydney sheldon', description: 'a very boring novel', bookType: 'story for both', acquiredDate: '2007'}]
   

   // res.render('product', { title: 'Products' });
});

// app.get('/', (req, res) => {
//     res.send('Welcome to Boot Camp book inventory app');
// });

// //send test app to this route
// app.get('/testapp', (req, res) => {
//     res.send('test app');
// });

// //send about to this route
// app.get('/about', function (req, res) {
//   res.send('about');
// });

// //send random to this route
// app.get('/random.text', function (req, res) {
//   res.send('random');
// });

// //post method not working yet
// app.post('/', function (req, res) {
//   res.send('POST request to the homepage')
// })

// //using a middleware to impose pre-conditions
// app.get('/example/b', function (req, res, next) {
//   console.log('the response will be sent by the next function ...')
//   next()
// }, function (req, res) {
//   res.send('Hello from B!')
// });

// //chainable route handler
// app.route('/book')
//   .get(function (req, res) {
//     res.send('Get a random book')
//   })
//   .post(function (req, res) {
//     res.send('Add a book')
//   })
//   .put(function (req, res) {
//     res.send('Update the book')
//   })

//listening on port
app.listen(4000, () => {
    console.log('yah we are listening at port 4000');
})