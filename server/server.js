const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the tester-app API' });
});

// Define Routes
app.use('/api/Auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/video', require('./routes/video'));
app.use('/api/experiment-results', require('./routes/experimentResults'));
app.use('/api/test-sessions', require('./routes/testSessions'));



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
