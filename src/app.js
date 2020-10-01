const express = require('express');
const app = express();

app.set('port', process.env.PORT || 4000);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Allow', 'GET, POST');
  next();
});
app.use(express.json());
app.use(require('./controllers/mercadolibre'));
app.listen(app.get('port'), () => {
  console.log(`Running on port: ${app.get('port')}`);
});