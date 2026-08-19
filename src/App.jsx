import React, { useState } from 'react';
import NotDefteri from './NotDefteri';
import Rutinler from './Rutinler';
import Dosyalar from './Dosyalar';

function App() {
  const [aktifTab, setAktifTab] = useState('notlar');

  return (
    <div className="app-container">
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