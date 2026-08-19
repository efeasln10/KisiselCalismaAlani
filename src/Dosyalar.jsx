import React, { useState, useEffect } from 'react';

function Dosyalar() {
  const [dosyalar, setDosyalar] = useState([]);
  const [baslik, setBaslik] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/dosyalar')
      .then((res) => res.json())
      .then((data) => setDosyalar(data));
  }, []);

  const dosyaEkle = () => {
    if (!baslik.trim() || !url.trim()) return;
    fetch('http://localhost:5000/api/dosyalar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baslik, url }),
    })
      .then((res) => res.json())
      .then((eklenen) => {
        setDosyalar([...dosyalar, eklenen]);
        setBaslik('');
        setUrl('');
      });
  };

  const dosyaSil = (id) => {
    fetch(`http://localhost:5000/api/dosyalar/${id}`, { method: 'DELETE' })
      .then(() => setDosyalar(dosyalar.filter((d) => d.id !== id)));
  };

  return (
    <div>
      <div className="input-group" style={{ flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Dosya / Slayt Başlığı"
          value={baslik}
          onChange={(e) => setBaslik(e.target.value)}
        />
        <input
          type="text"
          placeholder="Link / URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn-primary" onClick={dosyaEkle}>Kaydet</button>
      </div>

      <ul className="item-list">
        {dosyalar.map((d) => (
          <li key={d.id} className="item-card">
            <span>
              <strong>{d.baslik}:</strong>{' '}
              <a href={d.url} target="_blank" rel="noreferrer">{d.url}</a>
            </span>
            <button className="btn-delete" onClick={() => dosyaSil(d.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dosyalar;