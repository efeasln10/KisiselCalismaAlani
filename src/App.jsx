import React, { useState, useEffect } from 'react';
import NotDefteri from './NotDefteri';
import Rutinler from './Rutinler';
import Dosyalar from './Dosyalar';

function App() {
  const [aktifTab, setAktifTab] = useState('notlar');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      <div className="theme-toggle">
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Aydınlık Mod' : '🌙 Karanlık Mod'}
        </button>
      </div>

      <h2>✨ Kişisel Çalışma Alanı</h2>
      
      <div className="tab-buttons">
        <button 
          className={aktifTab === 'notlar' ? 'active' : ''} 
          onClick={() => setAktifTab('notlar')}
        >
          📝 Not Defteri
        </button>
        <button 
          className={aktifTab === 'rutinler' ? 'active' : ''} 
          onClick={() => setAktifTab('rutinler')}
        >
          📅 Rutinler
        </button>
        <button 
          className={aktifTab === 'dosyalar' ? 'active' : ''} 
          onClick={() => setAktifTab('dosyalar')}
        >
          📁 Dosyalar
        </button>
      </div>

      {aktifTab === 'notlar' && <NotDefteri />}
      {aktifTab === 'rutinler' && <Rutinler />}
      {aktifTab === 'dosyalar' && <Dosyalar />}
    </div>
  );
}

export default App;