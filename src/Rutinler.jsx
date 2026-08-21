import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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

  // Rutin Ekleme
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

  // Tik Atma (Durum Değiştirme)
  const durumDegistir = (id, mevcutDurum) => {
    fetch(`http://localhost:5001/api/rutinler/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tamamlandi: !mevcutDurum }),
    })
      .then(() => rutinleriGetir())
      .catch((err) => console.error('Guncelleme hatasi:', err));
  };

  // Rutin Silme
  const rutinSil = (id) => {
    fetch(`http://localhost:5001/api/rutinler/${id}`, { method: 'DELETE' })
      .then(() => rutinleriGetir());
  };

  // Pasta Grafiği İçin Hesaplamalar
  const tamamlananSayisi = rutinler.filter((r) => r.tamamlandi).length;
  const kalanSayisi = rutinler.length - tamamlananSayisi;

  const chartData = {
    labels: ['Tamamlanan', 'Kalan'],
    datasets: [
      {
        data: [tamamlananSayisi, kalanSayisi],
        backgroundColor: ['#4caf50', '#ff9800'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      {/* Pasta Grafiği Alanı */}
      <div style={{ maxWidth: '280px', margin: '0 auto 30px auto', textAlign: 'center' }}>
        <h3>📊 Görev İlerleme Durumu</h3>
        {rutinler.length > 0 ? (
          <Pie data={chartData} />
        ) : (
          <p style={{ fontSize: '14px', opacity: 0.8 }}>Henüz rutin eklenmedi.</p>
        )}
      </div>

      {/* Rutin Ekleme Formu */}
      <form className="input-group" onSubmit={rutinEkle}>
        <input
          type="text"
          placeholder="Yeni rutin/görev ekleyin..."
          value={yeniRutin}
          onChange={(e) => setYeniRutin(e.target.value)}
        />
        <button type="submit" className="btn-primary">Ekle</button>
      </form>

      {/* Rutin Listesi */}
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