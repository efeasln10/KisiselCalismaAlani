const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // Dosya yükleme paketi

const app = express();
const PORT = 5001;
const DATA_FILE = path.join(__dirname, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Uploads klasörü yoksa oluştur
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Multer Dosya Yükleme Ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
// Yüklenen dosyaları dışarıya erişilebilir yap
app.use('/uploads', express.static(UPLOADS_DIR));

const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initialData = { notlar: [], rutinler: [], dosyalar: [], klasorler: ['Ders Notları', 'Projeler', 'Sertifikalar'] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { notlar: [], rutinler: [], dosyalar: [], klasorler: ['Ders Notları', 'Projeler', 'Sertifikalar'] };
  }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// ==================== DOSYALAR & KLASÖRLER API ====================
app.get('/api/dosyalar', (req, res) => {
  const data = readData();
  res.json({ dosyalar: data.dosyalar || [], klasorler: data.klasorler || [] });
});

// Yeni Klasör Ekleme
app.post('/api/klasorler', (req, res) => {
  const data = readData();
  const { klasorAdi } = req.body;
  if (klasorAdi && !data.klasorler.includes(klasorAdi)) {
    data.klasorler.push(klasorAdi);
    writeData(data);
  }
  res.json(data.klasorler);
});

// Bilgisayardan Gerçek Dosya Yükleme
app.post('/api/dosyalar/yukle', upload.single('dosya'), (req, res) => {
  const data = readData();
  const yeniDosya = {
    id: Date.now(),
    ad: req.file.originalname,
    url: `http://localhost:5001/uploads/${req.file.filename}`,
    klasor: req.body.klasor || 'Genel',
    tip: req.file.mimetype
  };
  data.dosyalar = data.dosyalar || [];
  data.dosyalar.push(yeniDosya);
  writeData(data);
  res.json(yeniDosya);
});

// Manuel Link Ekleme
app.post('/api/dosyalar', (req, res) => {
  const data = readData();
  const yeniDosya = {
    id: Date.now(),
    ad: req.body.ad,
    url: req.body.url,
    klasor: req.body.klasor || 'Genel',
    tip: 'link'
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

// NOTLAR VE RUTİNLER ENDPOİNTLERİ AYNI KALACAK...
app.get('/api/notlar', (req, res) => res.json(readData().notlar || []));
app.post('/api/notlar', (req, res) => {
  const data = readData();
  const yeni = { id: Date.now(), metin: req.body.metin };
  data.notlar.push(yeni);
  writeData(data);
  res.json(yeni);
});
app.delete('/api/notlar/:id', (req, res) => {
  const data = readData();
  data.notlar = data.notlar.filter((n) => n.id !== Number(req.params.id));
  writeData(data);
  res.json({ message: 'OK' });
});

app.get('/api/rutinler', (req, res) => res.json(readData().rutinler || []));
app.post('/api/rutinler', (req, res) => {
  const data = readData();
  const yeni = { id: Date.now(), metin: req.body.metin, tamamlandi: false };
  data.rutinler.push(yeni);
  writeData(data);
  res.json(yeni);
});
app.put('/api/rutinler/:id', (req, res) => {
  const data = readData();
  data.rutinler = data.rutinler.map((r) => r.id === Number(req.params.id) ? { ...r, tamamlandi: req.body.tamamlandi } : r);
  writeData(data);
  res.json({ message: 'OK' });
});
app.delete('/api/rutinler/:id', (req, res) => {
  const data = readData();
  data.rutinler = data.rutinler.filter((r) => r.id !== Number(req.params.id));
  writeData(data);
  res.json({ message: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Backend ${PORT} portunda hazır!`);
});