const express = require("express");
const bodyParser = require("body-parser");
const { Customer, ContactPerson, Logs } = require("./models"); // Assuming models are defined in models.js
const cors = require('cors'); // CORS middleware
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from public folder

// API routes for customers
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.findAll({ include: ContactPerson });
        res.json(customers);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id, { include: ContactPerson });
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/customers', async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Serve create-customer.html
app.get('/create-customer', (req, res) => {
    res.sendFile(__dirname + '/public/create-customer.html');
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
