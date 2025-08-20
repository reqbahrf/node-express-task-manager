require('dotenv').config();
const connectDB = require('./db/connect');
const express = require('express');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const app = express();
const tasks = require('./routes/tasks');
app.use(express.static('./public'));
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
