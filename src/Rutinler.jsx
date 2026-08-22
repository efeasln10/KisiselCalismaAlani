import React, { useState, useEffect } from 'react';

function Rutinler() {
  const [rutinler, setRutinler] = useState([]);
  const [yeniRutin, setYeniRutin] = useState('');

  const rutinleriGetir = () => {
    fetch('http://localhost:5001/api/rutinler')
      .then((res) => res.json())
      .then((data) => setRutinler(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => { rutinleriGetir(); }, []);

  const rutinEkle = (e) => {
    e.preventDefault();
    if (!yeniRutin.trim()) return;
    fetch('http://localhost:5001/api/rutinler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metin: yeniRutin }),
    }).then(() => {
      setYeniRutin('');
      rutinleriGetir();
    });
  };

  const durumGuncelle = (id, suankiDurum) => {
    fetch(`http://localhost:5001/api/rutinler/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tamamlandi: !suankiDurum }),
    }).then(() => rutinleriGetir());
  };

  const rutinSil = (id) => {
    fetch(`http://localhost:5001/api/rutinler/${id}`, { method: 'DELETE' })
      .then(() => rutinleriGetir());
  };

  // Pasta Grafiği Hesaplamaları
  const tamamlananSayisi = rutinler.filter((r) => r.tamamlandi).length;
  const oran = rutinler.length === 0 ? 0 : Math.round((tamamlananSayisi / rutinler.length) * 100);

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>🎯 Rutinler & İlerleme</h3>

      {/* PASTA GRAFİĞİ (Yeşil ve Mavi) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
        <div
          style={{
            width: '120px', height: '120px', borderRadius: '50%',
            background: `conic-gradient(#00cec9 ${oran}%, #0984e3 0)`, /* Yeşil ve Mavi */
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{
            width: '90px', height: '90px', background: 'white', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', fontWeight: 'bold', color: '#333'
          }}>
            %{oran}
          </div>
        </div>
      </div>

      {/* ORTALANMIŞ EKLEME FORMU */}
      <form onSubmit={rutinEkle} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
        <input
          type="text"
          placeholder="Yeni rutin ekle..."
          value={yeniRutin}
          onChange={(e) => setYeniRutin(e.target.value)}
          style={{ width: '80%' }}
        />
        {/* Buton ortada ve belirli genişlikte */}
        <button type="submit" className="btn-primary" style={{ width: '40%' }}>Ekle</button>
      </form>

      {/* RUTİN LİSTESİ */}
      <ul className="item-list">
        {rutinler.map((r) => (
          <li key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                checked={r.tamamlandi} 
                onChange={() => durumGuncelle(r.id, r.tamamlandi)} 
                style={{ transform: 'scale(1.2)', cursor: 'pointer' }}
              />
              <span style={{ textDecoration: r.tamamlandi ? 'line-through' : 'none', opacity: r.tamamlandi ? 0.6 : 1, fontWeight: '600' }}>
                {r.metin}
              </span>
            </div>
            <button className="btn-delete" onClick={() => rutinSil(r.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rutinler;