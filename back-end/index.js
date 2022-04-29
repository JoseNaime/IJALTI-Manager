const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});