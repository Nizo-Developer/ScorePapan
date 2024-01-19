const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

// Set up Express to serve static files from the 'public' directory
app.use(express.static('public'));


app.get('/', (req, res) => {
    // Mengecek apakah ada cookie sesi, jika tidak ada, membuat cookie baru
    const sessionId = req.cookies.sessionId || generateUniqueId();
    
    // Mengirim cookie ke klien
    res.cookie('sessionId', sessionId, { maxAge: 900000, httpOnly: true });

    // Lakukan sesuatu dengan data sesi
    const sessionData = getSessionData(sessionId);
    
    res.send(`Data sesi: ${sessionData}`);
});

function generateUniqueId() {
    // Logika pembuatan ID unik
    return Math.random().toString(36).substring(7);
}

function getSessionData(sessionId) {
    // Logika untuk mendapatkan dan mengelola data sesi
    // Contoh sederhana: Menggunakan objek untuk menyimpan data sesi
    const sessions = {
        [sessionId]: { data: 'Sesi ini memiliki data tertentu' }
    };

    console.log(sessions[sessionId].data)
    return sessions[sessionId].data;
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
