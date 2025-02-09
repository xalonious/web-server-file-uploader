const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT;


app.use(express.static(path.join(__dirname, 'public')));

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(routesPath, file));
        app.use(route);
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
