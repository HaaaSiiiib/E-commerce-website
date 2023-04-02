require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const userRouter = require('./api/v1/routes/users');
const productRouter = require('./api/v1/routes/products');
const cartRouter = require('./api/v1/routes/carts');
const orderRouter = require('./api/v1/routes/orders');
const authRouter = require('./api/v1/routes/auth');

const errorController = require('./api/v1/controllers/error');

const knex = require('./db/knex');

knex.raw('select 1')
  .then(() => console.log('Database connected!'))
  .catch(() => console.error('Database connection error!'));

const app = express();
app.enable("trust proxy");

app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: '*' }));

app.use(morgan('combined', {
  skip: (req, res) => req.originalUrl === '/health'? true : false
}));


app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/auth', authRouter);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorController.errorHandler);

const port = process.env.PORT || 4003;
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening on address ${host}:${port}`);
})
