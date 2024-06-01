const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Permitir CORS para todas las solicitudes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Ruta para guardar las predicciones
app.post('/api/predictions', (req, res) => {
    const { username, predictions } = req.body;
    const filePath = path.join(__dirname, 'data', 'predictions.json');
    
    let users = [];
    if (fs.existsSync(filePath)) {
        users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        users[userIndex].predictions = predictions;
    } else {
        users.push({ username, predictions });
    }

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
