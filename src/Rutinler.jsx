import React, { useState, useEffect } from 'react';

function Rutinler() {
  const [rutinler, setRutinler] = useState([]);
  const [yeniGorev, setYeniGorev] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/rutinler')
      .then((res) => res.json())
      .then((data) => setRutinler(data));
  }, []);

  const gorevEkle = () => {
    if (!yeniGorev.trim()) return;
    fetch('http://localhost:5000/api/rutinler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gorev: yeniGorev }),
    })
      .then((res) => res.json())
      .then((eklenen) => {
        setRutinler([...rutinler, eklenen]);
        setYeniGorev('');
      });
  };

  const gorevSil = (id) => {
    fetch(`http://localhost:5000/api/rutinler/${id}`, { method: 'DELETE' })
      .then(() => setRutinler(rutinler.filter((r) => r.id !== id)));
  };

  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Yeni görev ekleyin..."
          value={yeniGorev}
          onChange={(e) => setYeniGorev(e.target.value)}
        />
        <button className="btn-primary" onClick={gorevEkle}>Ekle</button>
      </div>

      <ul className="item-list">
        {rutinler.map((r) => (
          <li key={r.id} className="item-card">
            <span>{r.gorev}</span>
            <button className="btn-delete" onClick={() => gorevSil(r.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rutinler;