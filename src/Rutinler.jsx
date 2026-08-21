import React, { useState, useEffect } from 'react';

function Rutinler() {
  const [rutinler, setRutinler] = useState([]);
  const [yeniRutin, setYeniRutin] = useState('');

  const rutinleriGetir = () => {
    fetch('http://localhost:5001/api/rutinler')
      .then((res) => res.json())
      .then((data) => setRutinler(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Rutin getirme hatası:', err));
  };

  useEffect(() => {
    rutinleriGetir();
  }, []);

  const rutinEkle = (e) => {
    e.preventDefault();
    if (!yeniRutin.trim()) return;

    fetch('http://localhost:5001/api/rutinler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metin: yeniRutin, tamamlandi: false }),
    })
      .then((res) => res.json())
      .then(() => {
        setYeniRutin('');
        rutinleriGetir();
      })
      .catch((err) => console.error('Ekleme hatası:', err));
  };

  const durumDegistir = (id, mevcutDurum) => {
    fetch(`http://localhost:5001/api/rutinler/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tamamlandi: !mevcutDurum }),
    })
      .then(() => rutinleriGetir())
      .catch((err) => console.error('Güncelleme hatası:', err));
  };

  const rutinSil = (id) => {
    fetch(`http://localhost:5001/api/rutinler/${id}`, { method: 'DELETE' })
      .then(() => rutinleriGetir());
  };

  const toplam = rutinler.length;
  const tamamlanan = rutinler.filter((r) => r.tamamlandi).length;
  const yuzde = toplam > 0 ? Math.round((tamamlanan / toplam) * 100) : 0;

  return (
    <div>
      {/* Kütüphanesiz CSS Pasta / Daire Grafiği */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h3>📊 Görev İlerleme Durumu</h3>
        {toplam > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `conic-gradient(#4caf50 0% ${yuzde}%, #ff9800 ${yuzde}% 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(5px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              >
                %{yuzde}
              </div>
            </div>
            <div style={{ fontSize: '14px', display: 'flex', gap: '15px' }}>
              <span style={{ color: '#4caf50', fontWeight: 'bold' }}>● Tamamlanan: {tamamlanan}</span>
              <span style={{ color: '#ff9800', fontWeight: 'bold' }}>● Kalan: {toplam - tamamlanan}</span>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '14px', opacity: 0.8 }}>Henüz rutin eklenmedi.</p>
        )}
      </div>

      <form className="input-group" onSubmit={rutinEkle}>
        <input
          type="text"
          placeholder="Yeni rutin/görev ekleyin..."
          value={yeniRutin}
          onChange={(e) => setYeniRutin(e.target.value)}
        />
        <button type="submit" className="btn-primary">Ekle</button>
      </form>

      <ul className="item-list">
        {rutinler.map((r) => (
          <li key={r.id} className="item-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="checkbox"
                checked={r.tamamlandi || false}
                onChange={() => durumDegistir(r.id, r.tamamlandi)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ textDecoration: r.tamamlandi ? 'line-through' : 'none', opacity: r.tamamlandi ? 0.6 : 1 }}>
                {r.metin}
              </span>
            </div>
            <button className="btn-delete" type="button" onClick={() => rutinSil(r.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rutinler;