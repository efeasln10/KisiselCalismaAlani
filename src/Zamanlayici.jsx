import React, { useState, useEffect, useRef } from 'react';

function Zamanlayici() {
  const [dakikaInput, setDakikaInput] = useState(25);
  const [kalanSaniye, setKalanSaniye] = useState(25 * 60);
  const [calisiyor, setCalisiyor] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (calisiyor && kalanSaniye > 0) {
      interval = setInterval(() => {
        setKalanSaniye((prev) => prev - 1);
      }, 1000);
    } else if (kalanSaniye === 0 && calisiyor) {
      setCalisiyor(false);
      // Süre bittiğinde zil sesini çal
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.log('Ses çalma hatası:', err));
      }
    }
    return () => clearInterval(interval);
  }, [calisiyor, kalanSaniye]);

  // Süreyi Ayarla
  const sureAyarla = (e) => {
    e.preventDefault();
    const dak = Math.max(1, parseInt(dakikaInput) || 1);
    setKalanSaniye(dak * 60);
    setCalisiyor(false);
  };

  // Zaman Formatlama (MM:SS)
  const formatZaman = (toplamSaniye) => {
    const dak = Math.floor(toplamSaniye / 60);
    const san = toplamSaniye % 60;
    return `${dak.toString().padStart(2, '0')}:${san.toString().padStart(2, '0')}`;
  };

  // Sıfırla
  const sifirla = () => {
    setCalisiyor(false);
    const dak = Math.max(1, parseInt(dakikaInput) || 1);
    setKalanSaniye(dak * 60);
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px 0' }}>
      <h3>⏱️ Esnek Çalışma Zamanlayıcısı</h3>

      {/* Süre Belirleme Formu */}
      <form onSubmit={sureAyarla} style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px' }}>
        <input
          type="number"
          min="1"
          max="180"
          value={dakikaInput}
          onChange={(e) => setDakikaInput(e.target.value)}
          placeholder="Dakika girin"
          disabled={calisiyor}
          style={{ width: '130px', textCenter: 'center' }}
        />
        <button type="submit" className="btn-primary" disabled={calisiyor}>
          Süreyi Set Et
        </button>
      </form>

      {/* Sayaç Ekranı */}
      <div
        style={{
          fontSize: '56px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          fontFamily: 'monospace',
          margin: '20px 0',
          color: calisiyor ? '#4caf50' : 'inherit',
        }}
      >
        {formatZaman(kalanSaniye)}
      </div>

      {/* Kontrol Butonları */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button
          onClick={() => setCalisiyor(!calisiyor)}
          className="btn-primary"
          style={{
            minWidth: '110px',
            background: calisiyor ? '#ff9800' : '#4caf50',
          }}
        >
          {calisiyor ? '⏸️ Duraklat' : '▶️ Başlat'}
        </button>
        <button
          onClick={sifirla}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.2)',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          🔄 Sıfırla
        </button>
      </div>

      {/* Tatlı Bildirim / Zil Sesi (Online Telifsiz Bildirim Sesi) */}
      <audio
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        preload="auto"
      />
    </div>
  );
}

export default Zamanlayici;