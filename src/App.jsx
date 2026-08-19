import React, { useState } from 'react';
import NotDefteri from './NotDefteri';

function App() {
  const [aktifTab, setAktifTab] = useState('notlar');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Kişisel Çalışma Alanı</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setAktifTab('notlar')}>Not Defteri</button>
        <button onClick={() => setAktifTab('rutinler')}>Günlük Rutin & Görevler</button>
        <button onClick={() => setAktifTab('dosyalar')}>Dosyalar & Slaytlar</button>
      </div>

      <hr />

      {aktifTab === 'notlar' && <NotDefteri />}
      {aktifTab === 'rutinler' && <div><h3>Günlük Rutin Bölümü</h3><p>Buraya görev listesi gelecek...</p></div>}
      {aktifTab === 'dosyalar' && <div><h3>Dosya & Slayt Yönetimi</h3><p>Buraya dökümanlar gelecek...</p></div>}
    </div>
  );
}

export default App;
