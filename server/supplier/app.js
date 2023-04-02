require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const supplyRouter = require('./api/v1/routes/supplies');

const errorController = require('./api/v1/controllers/error');

const app = express();
app.enable("trust proxy");

app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: '*' }));

app.use(morgan('combined', {
  skip: (req, res) => req.originalUrl === '/health'? true : false
}));


app.use('/api/v1', supplyRouter);


app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorController.errorHandler);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening on address ${host}:${port}`);
})
