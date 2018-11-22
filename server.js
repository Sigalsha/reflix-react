const express = require('express');
const bodyParser = require('body-parser') 
// const passport = require('./passport');
const app = express();
const mongoose = require('mongoose'); 
// const dbApi = require('./server/routes/ApiToDB');
const ApiServer = require('./server/routes/ApiServer')

mongoose.connect('mongodb://localhost/reflixDB', function() {
  console.log("DB connection established!!!");
})

//bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({ extended: false }))


// app.use('/', dbApi);

//app.user(clientApi)
app.use('/', ApiServer);

const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});



app.listen(port, () => console.log(`Listening on port ${port}`));






