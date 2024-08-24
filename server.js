const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint for uploading images
app.post('/upload', upload.single('image'), (req, res) => {
    res.sendStatus(200);
});

// Endpoint to get list of uploaded images
app.get('/images', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan files!');
        }
        const fileUrls = files.map(file => `/uploads/${file}`);
        res.json(fileUrls);
    });
});

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
