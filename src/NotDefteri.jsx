import React, { useState, useEffect } from 'react';

function NotDefteri() {
  const [notlar, setNotlar] = useState([]);
  const [yeniNot, setYeniNot] = useState('');
  const [arama, setArama] = useState('');

  const notlariGetir = () => {
    fetch('http://localhost:5001/api/notlar')
      .then((res) => res.json())
      .then((data) => setNotlar(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Veri çekme hatası:', err));
  };

  useEffect(() => {
    notlariGetir();
  }, []);

  const notEkle = (e) => {
    if (e) e.preventDefault();
    if (!yeniNot.trim()) return;

    fetch('http://localhost:5001/api/notlar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metin: yeniNot }),
    })
      .then((res) => res.json())
      .then(() => {
        setYeniNot('');
        notlariGetir();
      })
      .catch((err) => console.error('Ekleme hatası:', err));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      notEkle();
    }
  };

  const notSil = (id) => {
    fetch(`http://localhost:5001/api/notlar/${id}`, { method: 'DELETE' })
      .then(() => notlariGetir());
  };

  const filtrelenmisNotlar = notlar.filter((n) =>
    n.metin ? n.metin.toLowerCase().includes(arama.toLowerCase()) : false
  );

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="🔍 Notlarda ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <form className="input-group" onSubmit={notEkle}>
        <input
          type="text"
          placeholder="Yeni not yazın (Enter'a basabilirsiniz)..."
          value={yeniNot}
          onChange={(e) => setYeniNot(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="btn-primary">Ekle</button>
      </form>

      <ul className="item-list">
        {filtrelenmisNotlar.map((n) => (
          <li key={n.id} className="item-card">
            <span>{n.metin}</span>
            <button className="btn-delete" type="button" onClick={() => notSil(n.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotDefteri;