const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// JSON'dan veri okuma fonksiyonu
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = { notlar: [], rutinler: [], dosyalar: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  const rawData = fs.readFileSync(DATA_FILE);
  return JSON.parse(rawData);
};

// JSON'a veri yazma fonksiyonu
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- NOTLAR ---
app.get('/api/notlar', (req, res) => {
  const db = readData();
  res.json(db.notlar);
});

app.post('/api/notlar', (req, res) => {
  const { metin } = req.body;
  if (!metin) return res.status(400).json({ mesaj: 'Metin boş olamaz' });
  const db = readData();
  const yeniNot = { id: Date.now(), metin };
  db.notlar.push(yeniNot);
  saveData(db);
  res.status(201).json(yeniNot);
});

app.delete('/api/notlar/:id', (req, res) => {
  const { id } = req.params;
  const db = readData();
  db.notlar = db.notlar.filter((n) => n.id !== Number(id));
  saveData(db);
  res.json({ mesaj: 'Not silindi' });
});

// --- RUTİNLER ---
app.get('/api/rutinler', (req, res) => res.json(readData().rutinler));

app.post('/api/rutinler', (req, res) => {
  const { gorev } = req.body;
  if (!gorev) return res.status(400).json({ mesaj: 'Görev boş olamaz' });
  const db = readData();
  const yeniGorev = { id: Date.now(), gorev, tamamlandi: false };
  db.rutinler.push(yeniGorev);
  saveData(db);
  res.status(201).json(yeniGorev);
});

app.delete('/api/rutinler/:id', (req, res) => {
  const { id } = req.params;
  const db = readData();
  db.rutinler = db.rutinler.filter((r) => r.id !== Number(id));
  saveData(db);
  res.json({ mesaj: 'Görev silindi' });
});

// --- DOSYALAR ---
app.get('/api/dosyalar', (req, res) => res.json(readData().dosyalar));

app.post('/api/dosyalar', (req, res) => {
  const { baslik, url } = req.body;
  if (!baslik || !url) return res.status(400).json({ mesaj: 'Eksik bilgi' });
  const db = readData();
  const yeniDosya = { id: Date.now(), baslik, url };
  db.dosyalar.push(yeniDosya);
  saveData(db);
  res.status(201).json(yeniDosya);
});

app.delete('/api/dosyalar/:id', (req, res) => {
  const { id } = req.params;
  const db = readData();
  db.dosyalar = db.dosyalar.filter((d) => d.id !== Number(id));
  saveData(db);
  res.json({ mesaj: 'Dosya silindi' });
});

app.listen(PORT, () => {
  console.log(`Backend veritabanı desteğiyle ${PORT} portunda hazır!`);
});

// Görev durumu güncelleme (PUT)
app.put('/api/rutinler/:id', (req, res) => {
  const { id } = req.params;
  const db = readData();
  const rutin = db.rutinler.find((r) => r.id === Number(id));
  if (rutin) {
    rutin.tamamlandi = !rutin.tamamlandi;
    saveData(db);
    res.json(rutin);
  } else {
    res.status(404).json({ mesaj: 'Görev bulunamadı' });
  }
});