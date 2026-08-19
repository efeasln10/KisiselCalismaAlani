import React, { useState, useEffect } from 'react';

function NotDefteri() {
  const [notlar, setNotlar] = useState([]);
  const [yeniNot, setYeniNot] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/notlar')
      .then((res) => res.json())
      .then((data) => setNotlar(data));
  }, []);

  const notEkle = () => {
    if (!yeniNot.trim()) return;
    fetch('http://localhost:5000/api/notlar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metin: yeniNot }),
    })
      .then((res) => res.json())
      .then((eklenen) => {
        setNotlar([...notlar, eklenen]);
        setYeniNot('');
      });
  };

  const notSil = (id) => {
    fetch(`http://localhost:5000/api/notlar/${id}`, { method: 'DELETE' })
      .then(() => setNotlar(notlar.filter((n) => n.id !== id)));
  };

  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Notunuzu yazın..."
          value={yeniNot}
          onChange={(e) => setYeniNot(e.target.value)}
        />
        <button className="btn-primary" onClick={notEkle}>Ekle</button>
      </div>

      <ul className="item-list">
        {notlar.map((n) => (
          <li key={n.id} className="item-card">
            <span>{n.metin}</span>
            <button className="btn-delete" onClick={() => notSil(n.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotDefteri;