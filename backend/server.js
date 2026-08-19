const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Geçici veri havuzları
let notlar = [];
let rutinler = [];
let dosyalar = [];

// --- NOT DERSİ ROTALARI ---
app.get('/api/notlar', (req, res) => res.json(notlar));

app.post('/api/notlar', (req, res) => {
  const { metin } = req.body;
  if (!metin) return res.status(400).json({ mesaj: 'Metin boş olamaz' });
  const yeniNot = { id: Date.now(), metin };
  notlar.push(yeniNot);
  res.status(201).json(yeniNot);
});

// --- GÜNLÜK RUTİN & GÖREV ROTALARI ---
app.get('/api/rutinler', (req, res) => res.json(rutinler));

app.post('/api/rutinler', (req, res) => {
  const { gorev } = req.body;
  if (!gorev) return res.status(400).json({ mesaj: 'Görev boş olamaz' });
  const yeniGorev = { id: Date.now(), gorev, tamamlandi: false, notlar: '' };
  rutinler.push(yeniGorev);
  res.status(201).json(yeniGorev);
});

// --- DOSYA & SLAYT ROTALARI ---
app.get('/api/dosyalar', (req, res) => res.json(dosyalar));

app.post('/api/dosyalar', (req, res) => {
  const { baslik, aciklama, url } = req.body;
  if (!baslik) return res.status(400).json({ mesaj: 'Başlık boş olamaz' });
  const yeniDosya = { id: Date.now(), baslik, aciklama: aciklama || '', url: url || '' };
  dosyalar.push(yeniDosya);
  res.status(201).json(yeniDosya);
});

// --- SUNUCU ---
app.listen(PORT, () => {
  console.log(`Backend tüm rotalarıyla ${PORT} portunda hazır!`);
});