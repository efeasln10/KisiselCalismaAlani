# Kişisel Çalışma Platformu (Productivity & Study Portal)

## Proje Amacı ve Kapsamı
Bu proje; kullanıcıların günlük rutinlerini takip edebileceği, ders notlarını özel bir defter arayüzünde düzenleyebileceği, dokümanlarını klasör yapısıyla arşivleyebileceği, zaman yönetimi yapabileceği ve planlamalarını entegre takvim üzerinden gerçekleştirebileceği modern ve işlevsel bir kişisel verimlilik platformudur. Farklı tema seçenekleri sayesinde kullanıcı deneyimi kişiselleştirilebilir bir yapıya sahiptir.

## Ekip ve İş Paylaşımı
Bu platform, ortak bir çalışma olarak şu iş paylaşımıyla geliştirilmiştir:
- **Efe Aslan:** Backend Mimarisi, API Geliştirme, Sunucu Yapılandırması ve Veri Yönetimi
- **Müge Yılmaz:** Frontend Geliştirme, UI/UX Tasarımı, Arayüz Entegrasyonları ve Bileşen Mimarisi

## Öne Çıkan Özellikler
- **Klasörlü Dosya Yöneticisi:** PDF, Word, Excel, PowerPoint ve görsel dosyalarınızı kategorize ederek yükleyebilir ve dilediğiniz an tek tıkla erişebilirsiniz.
- **Defter Görünümlü Not Defteri:** Klasik not tutma deneyimini dijital ortama taşıyan, kırmızı dikey çizgili ve mavi satırlı özel defter arayüzü.
- **Rutin ve İlerleme Takibi:** Günlük alışkanlıkları ve görevleri yönetebileceğiniz dinamik liste yapısı ve anlık durumu gösteren özel mavi-yeşil pasta grafik entegrasyonu.
- **Zamanlayıcı Modülü:** Odaklanma sürelerini artırmak için tasarlanmış, gerektiğinde ekranı merkeze alan modal yapıdaki zamanlayıcı.
- **Entegre Takvim:** Planlamalarınızı ve önemli tarihlerinizi organize edebileceğiniz sağ panel takvim modülü.
- **Gelişmiş Tema Desteği:** Kullanıcı tercihine göre seçilebilen; özel renk geçişleriyle tasarlanmış Uzay, Doğa, Deniz, Ders, Koyu ve Açık tema seçenekleri.

## Teknolojiler
- **Frontend:** React.js, Vite, CSS Grid, Flexbox
- **Backend:** Node.js, Express.js, Multer (Dosya Yükleme)
- **Veri Saklama:** JSON tabanlı yerleşik kalıcı depolama (data.json)

## Detaylı Kurulum Adımları

Projeyi kendi bilgisayarınızda (lokal ortamda) çalıştırmak için aşağıdaki adımları sırasıyla takip edebilirsiniz:

1. Depoyu Klonlayın:
Terminal veya komut satırını açarak projeyi bilgisayarınıza indirmek için şu komutu çalıştırın:
git clone https://github.com/efeasln10/KisiselCalismaAlani.git
cd KisiselCalismaAlani

2. Backend Bağımlılıklarını Kurun ve Sunucuyu Başlatın:
- Backend klasörüne geçiş yapın:
  cd backend
- Gerekli paketleri (Express, CORS, Multer vb.) yükleyin:
  npm install
- Sunucuyu çalıştırın:
  node server.js
*(Bu adım sonucunda terminalde "Backend 5001 portunda hazır!" mesajını görmelisiniz.)*

3. Frontend Bağımlılıklarını Kurun ve Arayüzü Başlatın:
- Yeni bir terminal penceresi açın ve projenin ana kök dizinine geri dönün.
- Frontend için gerekli paketleri yükleyin:
  npm install
- Geliştirme sunucusunu (Vite) başlatın:
  npm run dev

4. Uygulamaya Erişim:
Terminalde size verilen yerel bağlantı adresine (genellikle http://localhost:5173) tarayıcınız üzerinden giderek platformu kullanmaya başlayabilirsiniz.
