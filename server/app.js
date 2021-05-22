const express = require('express')
const mongoose = require('mongoose')
const itemRoutes = require('./routes/item.route')
const infoRoutes = require('./routes/info.route')
const app = express()
const cfg = require('./cfg/default')

mongoose.connect(cfg.mongodbConnectUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))


// app.use(requireHTTPS);
app.use(require('cors')())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

app.use(itemRoutes)
app.use(infoRoutes)


app.use(express.static('./dist/testListNgExpress'));
app.get('/*', function(_, res) {
  res.sendFile('index.html', {root: 'dist/testListNgExpress/'}
  );
});

module.exports = app

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
