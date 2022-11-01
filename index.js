const express = require('express'); //Import the express dependency
const app = express();
var cors = require('cors')

const dotenv = require('dotenv').config();
const port = process.env.PORT;
const routes = require('./routes/routes')
const dbConnect = require("./utils/db_config")
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
  next();
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors());
app.use(express.json())

app.use('/api', require('./routes/routes'))



app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
    console.log(port)
}); 