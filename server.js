
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// importing files
const routes = require('./routes');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080;

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const wishRouter = require('./routes')
app.use('/', wishRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to McCollins Technologies. You can make a typical request like this: 'enye-collins-api.herokuapp.com/api/rates?base=usd&currency=cny,jpy,cad' " });
});

app.get('*', (req, res) => {
    res.status(404).send("Oooops! It seems the page you are requesting for does not exist. Visit <a href='/'>enye-collins-api.herokuapp.com</a> to see how to make a typical valid request" );
  });

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});