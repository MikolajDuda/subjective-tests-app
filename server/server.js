const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({message: 'Welcome to the tester-app API'});
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${ PORT }`);
});
