const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const tokenValidator = require('./middleware/tokenValidator');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/fields', tokenValidator, fieldRoutes);
app.use('/api/ai', tokenValidator, aiRoutes);

app.get('/', (req, res) => {
    res.status(200).send({ status: "success", msg: "API is working well." });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
