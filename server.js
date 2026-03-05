const express = require('express'); 
const app = express();

const PORT = process.env.PORT || 3000;

const NIMI = process.env.MY_NAME || 'Tundmatu nimi';

app.use(express.static('.'));

app.get('/api/info', (req, res) => {
    res.status(200).json({
        mission: "Iseseisev deploimine edukas",

        meeskond: NIMI,
        eeg: new Date().toISOString()

    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Server töötab selle pordi peale ${PORT}`);
});