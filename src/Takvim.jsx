import React, { useState, useEffect } from 'react';

function Takvim() {
  const [mevcutTarih, setMevcutTarih] = useState(new Date());
  const [seciliGun, setSeciliGun] = useState(new Date().getDate());
  const [notMetni, setNotMetni] = useState('');
  const [notlar, setNotlar] = useState({});

  const yil = mevcutTarih.getFullYear();
  const ay = mevcutTarih.getMonth();

  // Sayfa açıldığında localStorage'dan kayıtlı takvim notlarını çek
  useEffect(() => {
    const kayitliNotlar = localStorage.getItem('takvimNotlari');
    if (kayitliNotlar) {
      setNotlar(JSON.parse(kayitliNotlar));
    }
  }, []);

  // Tarih anahtarı oluşturur (Örn: "2026-8-21")
  const tarihAnahtari = (d) => `${yil}-${ay + 1}-${d}`;

  // Seçili gün değiştiğinde var olan notu getir
  useEffect(() => {
    const key = tarihAnahtari(seciliGun);
    setNotMetni(notlar[key] || '');
  }, [seciliGun, mevcutTarih, notlar]);

  // Not Kaydetme
  const notKaydet = (e) => {
    e.preventDefault();
    const key = tarihAnahtari(seciliGun);
    const yeniNotlar = { ...notlar, [key]: notMetni };
    setNotlar(yeniNotlar);
    localStorage.setItem('takvimNotlari', JSON.stringify(yeniNotlar));
  };

  // Not Silme
  const notSil = () => {
    const key = tarihAnahtari(seciliGun);
    const yeniNotlar = { ...notlar };
    delete yeniNotlar[key];
    setNotlar(yeniNotlar);
    setNotMetni('');
    localStorage.setItem('takvimNotlari', JSON.stringify(yeniNotlar));
  };

  // Ay Değiştirme
  const ayDegistir = (yon) => {
    setMevcutTarih(new Date(yil, ay + yon, 1));
    setSeciliGun(1);
  };

  const ayAdlari = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const ayinIlkGunu = new Date(yil, ay, 1).getDay();
  const ayinToplamGunu = new Date(yil, ay + 1, 0).getDate();
  const baslangicBosluk = (ayinIlkGunu + 6) % 7; // Pazartesi ile başlatma ayarı

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {/* Sol Taraf: Takvim Görünümü */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <button type="button" onClick={() => ayDegistir(-1)} className="btn-primary" style={{ padding: '4px 10px' }}>◀</button>
          <h3 style={{ margin: 0 }}>{ayAdlari[ay]} {yil}</h3>
          <button type="button" onClick={() => ayDegistir(1)} className="btn-primary" style={{ padding: '4px 10px' }}>▶</button>
        </div>

        {/* Gün İsimleri */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>
          <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span>
        </div>

        {/* Gün Kutucukları */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
          {Array.from({ length: baslangicBosluk }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {Array.from({ length: ayinToplamGunu }).map((_, index) => {
            const gun = index + 1;
            const key = tarihAnahtari(gun);
            const notVar = !!notlar[key];
            const seciliMi = gun === seciliGun;

            return (
              <button
                key={gun}
                type="button"
                onClick={() => setSeciliGun(gun)}
                style={{
                  padding: '10px 0',
                  borderRadius: '8px',
                  border: seciliMi ? '2px solid #007bff' : '1px solid rgba(255,255,255,0.2)',
                  background: seciliMi ? 'rgba(0, 123, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                  color: 'inherit',
                  cursor: 'pointer',
                  position: 'relative',
                  fontWeight: seciliMi ? 'bold' : 'normal'
                }}
              >
                {gun}
                {notVar && (
                  <span style={{ position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)', width: '5px', height: '5px', background: '#4caf50', borderRadius: '50%' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sağ Taraf: Günlük Not / Ajanda */}
      <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
        <h4>{seciliGun} {ayAdlari[ay]} Notu</h4>
        <form onSubmit={notKaydet} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <textarea
            rows="6"
            placeholder="Bu gün için not/etkinlik yazın..."
            value={notMetni}
            onChange={(e) => setNotMetni(e.target.value)}
            style={{ width: '100%', borderRadius: '8px', padding: '10px', resize: 'vertical' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>Kaydet</button>
            {notlar[tarihAnahtari(seciliGun)] && (
              <button type="button" className="btn-delete" onClick={notSil}>Sil</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Takvim;