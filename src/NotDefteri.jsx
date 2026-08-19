import React, { useState, useEffect } from 'react';

function NotDefteri() {
  const [notlar, setNotlar] = useState([]);
  const [yeniNot, setYeniNot] = useState('');

  // 1. Sayfa yüklendiğinde backend'deki notları çek
  useEffect(() => {
    fetch('http://localhost:5000/api/notlar')
      .then((res) => res.json())
      .then((data) => setNotlar(data))
      .catch((err) => console.error('Notlar çekilirken hata:', err));
  }, []);

  // 2. Yeni notu backend'e gönder ve listeyi güncelle
  const notEkle = () => {
    if (yeniNot.trim() === '') return;

    fetch('http://localhost:5000/api/notlar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metin: yeniNot }),
    })
      .then((res) => res.json())
      .then((eklenenNot) => {
        setNotlar([...notlar, eklenenNot]);
        setYeniNot('');
      })
      .catch((err) => console.error('Not eklenirken hata:', err));
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>📝 Not Defteri</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Notunuzu yazın..."
          value={yeniNot}
          onChange={(e) => setYeniNot(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={notEkle}>Ekle</button>
      </div>

      <ul>
        {notlar.map((not) => (
          <li key={not.id} style={{ marginBottom: '8px' }}>
            {not.metin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotDefteri;