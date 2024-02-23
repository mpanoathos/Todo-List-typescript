import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://athos:barera0009@cluster0.myuobr9.mongodb.net/todo-list?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

// Event listener for successful MongoDB connection
db.on('open', () => {
  console.log('Connected to MongoDB');
});

// Event listener for MongoDB connection error
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the TODO App!');
  });
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
