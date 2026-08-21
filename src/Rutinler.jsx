import React, { useState, useEffect } from 'react';

function Rutinler() {
  const [rutinler, setRutinler] = useState([]);
  const [yeniGorev, setYeniGorev] = useState('');

  const rutinleriGetir = () => {
    fetch('http://localhost:5000/api/rutinler')
      .then((res) => res.json())
      .then((data) => setRutinler(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Hata:', err));
  };

  useEffect(() => {
    rutinleriGetir();
  }, []);

  const gorevEkle = (e) => {
    e.preventDefault();
    if (!yeniGorev.trim()) return;

    fetch('http://localhost:5000/api/rutinler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gorev: yeniGorev }),
    })
      .then((res) => res.json())
      .then(() => {
        setYeniGorev('');
        rutinleriGetir();
      });
  };

  const durumDegistir = (id) => {
    fetch(`http://localhost:5000/api/rutinler/${id}`, { method: 'PUT' })
      .then(() => rutinleriGetir());
  };

  const gorevSil = (id) => {
    fetch(`http://localhost:5000/api/rutinler/${id}`, { method: 'DELETE' })
      .then(() => rutinleriGetir());
  };

  return (
    <div>
      <form className="input-group" onSubmit={gorevEkle}>
        <input
          type="text"
          placeholder="Yeni görev ekleyin (Enter'a basabilirsiniz)..."
          value={yeniGorev}
          onChange={(e) => setYeniGorev(e.target.value)}
        />
        <button type="submit" className="btn-primary">Ekle</button>
      </form>

      <ul className="item-list">
        {rutinler.map((r) => (
          <li key={r.id} className="item-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={r.tamamlandi || false}
                onChange={() => durumDegistir(r.id)}
              />
              <span className={r.tamamlandi ? 'completed' : ''}>{r.gorev}</span>
            </div>
            <button className="btn-delete" onClick={() => gorevSil(r.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rutinler;