const express = require('express');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
