const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadDirectory = path.join(__dirname, '../received');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = Date.now() + '-' + file.originalname;
        cb(null, uniqueFilename);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024 * 1024,
    },
});

router.use((req, res, next) => {
    const apiKey = req.query.auth_token;
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Forbidden: Invalid or missing auth token' });
    }
    next();
});

router.post('/upload', (req, res, next) => {
    upload.array('files')(req, res, function (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ error: 'Multer error: ' + err.message });
            } else {
                return res.status(500).json({ error: 'Server error: ' + err.message });
            }
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        res.status(200).json({ message: 'Files uploaded successfully', files: req.files.map(file => file.filename) });
    });
});

router.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/upload.html'));
});

module.exports = router;


