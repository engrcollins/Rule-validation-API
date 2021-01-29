
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

app.get('*', (req, res) => {
    res.status(404).send("Oooops! It seems the page you are requesting for does not exist. Go back to <a href='/'>Home</a>" );
  });

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});