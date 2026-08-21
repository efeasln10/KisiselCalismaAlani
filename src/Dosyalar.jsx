import React, { useState, useEffect } from 'react';

function Dosyalar() {
  const [dosyalar, setDosyalar] = useState([]);
  const [klasorler, setKlasorler] = useState(['Genel']);
  const [seciliKlasor, setSeciliKlasor] = useState('Tümü');
  const [yuklenecekKlasor, setYuklenecekKlasor] = useState('Genel');
  const [yeniKlasorAdi, setYeniKlasorAdi] = useState('');
  const [yuklenecekDosya, setYuklenecekDosya] = useState(null);

  const verileriGetir = () => {
    fetch('http://localhost:5001/api/dosyalar')
      .then((res) => res.json())
      .then((data) => {
        setDosyalar(data.dosyalar || []);
        setKlasorler(data.klasorler.length ? data.klasorler : ['Genel']);
      });
  };

  useEffect(() => { verileriGetir(); }, []);

  // Yeni Klasör Oluşturma
  const klasorEkle = (e) => {
    e.preventDefault();
    if (!yeniKlasorAdi.trim()) return;
    fetch('http://localhost:5001/api/klasorler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ klasorAdi: yeniKlasorAdi }),
    }).then(() => {
      setYeniKlasorAdi('');
      verileriGetir();
    });
  };

  // Bilgisayardan Dosya Yükleme (PDF, Word, Excel, Görsel vb.)
  const dosyaYukle = (e) => {
    e.preventDefault();
    if (!yuklenecekDosya) return;

    const formData = new FormData();
    formData.append('dosya', yuklenecekDosya);
    formData.append('klasor', yuklenecekKlasor);

    fetch('http://localhost:5001/api/dosyalar/yukle', {
      method: 'POST',
      body: formData,
    }).then(() => {
      setYuklenecekDosya(null);
      verileriGetir();
    });
  };

  const dosyaSil = (id) => {
    fetch(`http://localhost:5001/api/dosyalar/${id}`, { method: 'DELETE' })
      .then(() => verileriGetir());
  };

  const filtrelenmis = dosyalar.filter((d) =>
    seciliKlasor === 'Tümü' ? true : d.klasor === seciliKlasor
  );

  return (
    <div>
      <h3>📂 Klasörlü Dosya & Doküman Yöneticisi</h3>

      {/* 1. Yeni Klasör Oluşturma Alanı */}
      <form onSubmit={klasorEkle} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Yeni Klasör Adı (Örn: Matematik PDF'leri)"
          value={yeniKlasorAdi}
          onChange={(e) => setYeniKlasorAdi(e.target.value)}
        />
        <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>+ Klasör Aç</button>
      </form>

      {/* 2. Bilgisayardan Dosya Yükleme Alanı */}
      <form onSubmit={dosyaYukle} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>📤 Bilgisayardan Doküman Yükle (PDF, Word, Excel, PNG...):</label>
        <input
          type="file"
          onChange={(e) => setYuklenecekDosya(e.target.files[0])}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={yuklenecekKlasor}
            onChange={(e) => setYuklenecekKlasor(e.target.value)}
            style={{ flex: 1, padding: '8px' }}
          >
            {klasorler.map((k) => <option key={k} value={k}>📁 {k}</option>)}
          </select>
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>Yükle</button>
        </div>
      </form>

      {/* 3. Klasör Filtreleme Sekmeleri */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSeciliKlasor('Tümü')}
          style={{ background: seciliKlasor === 'Tümü' ? '#007bff' : 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '12px', color: '#fff', border: 'none' }}
        >
          🗂️ Tümü
        </button>
        {klasorler.map((k) => (
          <button
            key={k}
            onClick={() => setSeciliKlasor(k)}
            style={{ background: seciliKlasor === k ? '#007bff' : 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '12px', color: '#fff', border: 'none' }}
          >
            📁 {k}
          </button>
        ))}
      </div>

      {/* 4. Yüklenen Dosyalar Listesi */}
      <ul className="item-list">
        {filtrelenmis.map((d) => (
          <li key={d.id} className="item-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: '#007bff', color: '#fff', marginRight: '8px' }}>
                {d.klasor}
              </span>
              <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'inherit' }}>
                📄 {d.ad}
              </a>
            </div>
            <button className="btn-delete" onClick={() => dosyaSil(d.id)}>Sil</button>
          </li>
        ))}
      </ul>
      {filtrelenmis.length === 0 && <p style={{ textAlign: 'center', opacity: 0.6 }}>Bu klasörde henüz dosya yok.</p>}
    </div>
  );
}

export default Dosyalar;