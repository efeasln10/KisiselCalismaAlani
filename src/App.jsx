import React, { useState, useEffect } from 'react';
import NotDefteri from './NotDefteri';
import Rutinler from './Rutinler';
import Dosyalar from './Dosyalar';

function App() {
  const [aktifSekme, setAktifSekme] = useState('rutinler');
  const [tema, setTema] = useState('uzay');

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${tema}`);
  }, [tema]);

  return (
    <div className="container">
      <h1>✨ Kişisel Çalışma Alanı</h1>

      {/* TEMA SEÇİM BUTONLARI */}
      <div className="theme-selector">
        <button className="theme-btn" style={{background: '#2c5364', color: '#fff'}} onClick={() => setTema('uzay')}>🚀 Uzay</button>
        <button className="theme-btn" style={{background: '#71b280', color: '#fff'}} onClick={() => setTema('doga')}>🌿 Doğa</button>
        <button className="theme-btn" style={{background: '#d7c4b7', color: '#4a3b32'}} onClick={() => setTema('ders')}>📚 Ders</button>
        <button className="theme-btn" style={{background: '#e9ecef', color: '#333'}} onClick={() => setTema('sade')}>⚪ Sade</button>
      </div>

      {/* SEKMELER */}
      <div className="tab-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={() => setAktifSekme('rutinler')} className={aktifSekme === 'rutinler' ? 'btn-primary' : ''}>Rutinler & İlerleme</button>
        <button onClick={() => setAktifSekme('notlar')} className={aktifSekme === 'notlar' ? 'btn-primary' : ''}>Not Defteri</button>
        <button onClick={() => setAktifSekme('dosyalar')} className={aktifSekme === 'dosyalar' ? 'btn-primary' : ''}>Dosyalar</button>
      </div>

      <div className="card">
        {aktifSekme === 'rutinler' && <Rutinler />}
        {aktifSekme === 'notlar' && <NotDefteri />}
        {aktifSekme === 'dosyalar' && <Dosyalar />}
      </div>
    </div>
  );
}

export default App;