const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// JSON Veri Okuma Yardımcı Fonksiyonu
const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initialData = { notlar: [], rutinler: [], dosyalar: [] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { notlar: [], rutinler: [], dosyalar: [] };
  }
};

// JSON Veri Yazma Yardımcı Fonksiyonu
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// ==================== NOTLAR API ====================
app.get('/api/notlar', (req, res) => {
  const data = readData();
  res.json(data.notlar || []);
});

app.post('/api/notlar', (req, res) => {
  const data = readData();
  const yeniNot = { id: Date.now(), metin: req.body.metin };
  data.notlar = data.notlar || [];
  data.notlar.push(yeniNot);
  writeData(data);
  res.json(yeniNot);
});

app.delete('/api/notlar/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  data.notlar = (data.notlar || []).filter((n) => n.id !== id);
  writeData(data);
  res.json({ message: 'Not silindi' });
});

// ==================== RUTİNLER API ====================
app.get('/api/rutinler', (req, res) => {
  const data = readData();
  res.json(data.rutinler || []);
});

app.post('/api/rutinler', (req, res) => {
  const data = readData();
  const yeniRutin = {
    id: Date.now(),
    metin: req.body.metin,
    tamamlandi: false
  };
  data.rutinler = data.rutinler || [];
  data.rutinler.push(yeniRutin);
  writeData(data);
  res.json(yeniRutin);
});

app.put('/api/rutinler/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  data.rutinler = (data.rutinler || []).map((r) =>
    r.id === id ? { ...r, tamamlandi: req.body.tamamlandi } : r
  );
  writeData(data);
  res.json({ message: 'Rutin güncellendi' });
});

app.delete('/api/rutinler/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  data.rutinler = (data.rutinler || []).filter((r) => r.id !== id);
  writeData(data);
  res.json({ message: 'Rutin silindi' });
});

// ==================== DOSYALAR API ====================
app.get('/api/dosyalar', (req, res) => {
  const data = readData();
  res.json(data.dosyalar || []);
});

app.post('/api/dosyalar', (req, res) => {
  const data = readData();
  const yeniDosya = {
    id: Date.now(),
    ad: req.body.ad,
    url: req.body.url,
    kategori: req.body.kategori || 'Genel'
  };
  data.dosyalar = data.dosyalar || [];
  data.dosyalar.push(yeniDosya);
  writeData(data);
  res.json(yeniDosya);
});

app.delete('/api/dosyalar/:id', (req, res) => {
  const data = readData();
  const id = Number(req.params.id);
  data.dosyalar = (data.dosyalar || []).filter((d) => d.id !== id);
  writeData(data);
  res.json({ message: 'Dosya silindi' });
});

app.listen(PORT, () => {
  console.log(`Backend tüm servisleriyle (Notlar, Rutinler, Dosyalar) ${PORT} portunda hazır!`);
});