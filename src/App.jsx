import React, { useState, useEffect } from 'react';
import NotDefteri from './NotDefteri';
import Rutinler from './Rutinler';
import Dosyalar from './Dosyalar';
import Zamanlayici from './Zamanlayici';
import Takvim from './Takvim';

function App() {
  // Varsayılan temayı uzay yaptık
  const [tema, setTema] = useState('uzay'); 
  const [timerAcik, setTimerAcik] = useState(false);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${tema}`);
  }, [tema]);

  return (
    <>
      <div className="left-panel">
        <div className="card-box dosyalar-wrapper">
          <Dosyalar />
        </div>
        <div className="notlar-wrapper">
          <NotDefteri />
        </div>
      </div>

      <div className="header-area">
        <h1>KİŞİSEL ÇALIŞMA PLATFORMU</h1>
        <div className="theme-boxes">
          <div className="theme-box tb-uzay" onClick={() => setTema('uzay')} title="Uzay">🪐</div>
          <div className="theme-box tb-doga" onClick={() => setTema('doga')} title="Doğa">🌿</div>
          <div className="theme-box tb-deniz" onClick={() => setTema('deniz')} title="Deniz">🌊</div>
          <div className="theme-box tb-ders" onClick={() => setTema('ders')} title="Ders">📖</div>
          <div className="theme-box tb-koyu" onClick={() => setTema('koyu')} title="Koyu">🌙</div>
          <div className="theme-box tb-acik" onClick={() => setTema('acik')} title="Açık">☀️</div>
        </div>
      </div>

      <div className="card-box center-panel">
        <Rutinler />
      </div>

      <div className="right-panel">
        <button className="btn-timer-open" onClick={() => setTimerAcik(true)}>
          ⏱️ Zamanlayıcıyı Kur
        </button>
        <div className="card-box takvim-wrapper">
          <Takvim />
        </div>
      </div>

      {timerAcik && (
        <div className="modal-overlay" onClick={(e) => { if (e.target.className === 'modal-overlay') setTimerAcik(false) }}>
          <div className="modal-content">
            <button className="btn-close" onClick={() => setTimerAcik(false)}>✖</button>
            <Zamanlayici />
          </div>
        </div>
      )}
    </>
  );
}

export default App;