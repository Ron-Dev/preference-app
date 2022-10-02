const path = require('path');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const user = require('./routes/user.route');
const InitiateDBServer = require('./config/db');

InitiateDBServer();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', user);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
