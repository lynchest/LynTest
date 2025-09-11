Klavye Yazma Hızı Testi Sitesi - Geliştirilmiş Proje Planı (Ayrılmış Mimaride)

Bu belge, frontend ve backend servisleri ayrı olarak çalışan modern ve kullanıcı dostu bir klavye yazma hızı testi web uygulaması geliştirmek için kapsamlı bir yol haritası sunar.
1. Proje Özeti ve Hedefler

Amaç: Kullanıcıların yazma hızlarını (WPM), doğruluk oranlarını ve zamanlarını ölçmelerini sağlayan, anlık geri bildirim sunan ve performans geçmişlerini hem tarayıcıda (localStorage) hem de sunucu tarafında (SQLite) saklayan bir web uygulaması oluşturmak.

Temel Hedefler:

    Kayıt Gerektirmez: Kullanıcıların anında teste başlayabilmesi.

    Anlık Geri Bildirim: Yazarken doğru ve yanlış karakterlerin anında görsel olarak belirtilmesi.

    Detaylı Sonuçlar: WPM, doğruluk yüzdesi ve süre gibi metriklerin net bir şekilde sunulması.

    Performans Geçmişi: localStorage ile tarayıcıya özel geçmiş verileri ve SQLite ile genel bir log kaydı tutulması.

    Modern ve Duyarlı Arayüz: Temiz, sezgisel ve mobil cihazlarla uyumlu bir tasarım.

2. Teknoloji Yığını

Alan
	

Teknoloji
	

Gerekçe

Frontend
	

HTML, CSS, JavaScript
	

Web'in temel taşları. Ek bir kütüphaneye ihtiyaç duymadan hızlı ve hafif bir arayüz sağlar.

Backend
	

Node.js + Express.js
	

Hızlı API geliştirme, geniş npm ekosistemi ve JavaScript dilindeki bütünlük için idealdir.

Veritabanı
	

SQLite
	

Sıfır konfigürasyon gerektiren, dosya tabanlı, basit ve bu ölçekteki bir proje için mükemmel bir seçimdir.

API İletişimi
	

CORS (Cross-Origin Resource Sharing)
	

Farklı portlarda/adreslerde çalışan frontend ve backend'in güvenli bir şekilde haberleşmesini sağlar.
3. Proje Mimarisi ve Dosya Yapısı

Proje, frontend ve backend olmak üzere iki ana klasöre ayrılacaktır. Her biri kendi bağımsız projesi olarak yönetilecektir.

/typing-speed-test-project/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── database.js     # Veritabanı bağlantısı ve kurulumu
│   │   └── routes/
│   │       └── logs.js         # /api/logs rotaları
│   ├── .gitignore
│   ├── server.js               # Ana Express sunucu dosyası
│   ├── package.json            # Backend bağımlılıkları (express, sqlite3, cors)
│   └── database.db             # SQLite veritabanı dosyası
│
└── frontend/
    ├── index.html              # Ana HTML yapısı
    ├── styles.css              # Görsel stiller
    └── app.js                  # Frontend uygulama mantığı

4. Veritabanı Tasarımı

speed_logs adında tek bir tablo kullanılacaktır. (Bu bölümde değişiklik yoktur.)

Tablo Şeması: speed_logs

Sütun Adı
	

Veri Tipi
	

Açıklama

id
	

INTEGER PRIMARY KEY AUTOINCREMENT
	

Benzersiz log kimliği

wpm
	

INTEGER NOT NULL
	

Dakikadaki Kelime Sayısı (Words Per Minute)

accuracy
	

REAL NOT NULL
	

Doğruluk yüzdesi (Örn: 98.5)

duration
	

INTEGER NOT NULL
	

Testin tamamlanma süresi (saniye cinsinden)

timestamp
	

TEXT NOT NULL
	

Kaydın oluşturulduğu tarih (ISO 8601 formatı)
5. Backend Geliştirme (API Sunucusu)

Backend, sadece bir JSON API sunucusu olarak görev yapacak ve frontend'den gelen isteklere yanıt verecektir.

    CORS Yapılandırması: Frontend'den (farklı bir porttan) gelen isteklere izin vermek için cors paketi kullanılacaktır.

        Kurulum: npm install cors

        Kullanım (server.js): app.use(cors());

API Endpoints

(Endpoint tanımlarında değişiklik yoktur.)
POST /api/logs

Yeni bir hız testi sonucunu veritabanına kaydeder.
GET /api/logs

Kaydedilmiş tüm hız testi sonuçlarını listeler.
6. Frontend Geliştirme (Kullanıcı Arayüzü)

Frontend, statik HTML, CSS ve JavaScript dosyalarından oluşur ve API isteklerini backend sunucusuna yapar.
6.1. HTML Yapısı (frontend/index.html)

(Bu bölümde değişiklik yoktur.)
6.2. CSS (frontend/styles.css)

(Bu bölümde değişiklik yoktur.)
6.3. JavaScript Mantığı (frontend/app.js)

    Test Akışı: (Akışta değişiklik yoktur.)

    Hesaplama Formülleri: (Formüllerde değişiklik yoktur.)

    Veri Yönetimi:

        Test sonunda sonuçlar bir obje olarak oluşturulur.

        Bu obje localStorage'a kaydedilir ve geçmiş listesi güncellenir.

        API İsteği: Aynı obje, fetch API ile backend sunucusunun tam adresine gönderilir. Örn: fetch('http://localhost:3000/api/logs', { ... }).

7. Detaylandırılmış Geliştirme Yol Haritası

Bu yol haritası, projenin tamamlanması için gereken adımları aşamalara ve alt görevlere ayırır.
Aşama 1: Backend Kurulumu ve API Geliştirme (Hedef: 1-2 Gün)

Bu aşamanın sonunda, Postman gibi bir araçla test edilebilir, çalışan bir API sunucumuz olacak.

    1.1. Proje Yapısının Oluşturulması

        [ ] typing-speed-test-project ana dizinini ve içinde backend dizinini oluştur.

        [ ] Terminalde backend dizinine girerek npm init -y komutunu çalıştır.

        [ ] Gerekli paketleri kur: npm install express sqlite3 cors.

        [ ] backend dizini içinde src, src/db, src/routes klasör yapısını oluştur.

    1.2. Express Sunucusunun Kurulumu

        [ ] backend/server.js dosyasını oluşturup temel Express sunucusunu kur (port: 3000).

        [ ] app.use(cors()) ile CORS'u ve app.use(express.json()) ile JSON body parser'ını etkinleştir.

    1.3. Veritabanı Kurulumu

        [ ] backend/src/db/database.js dosyasını oluştur.

        [ ] Veritabanına bağlanan ve speed_logs tablosunu (eğer yoksa) oluşturan bir initDb fonksiyonu yaz.

        [ ] Bu fonksiyonu sunucu başlangıcında çağır.

    1.4. API Rotalarının Oluşturulması

        [ ] backend/src/routes/logs.js içinde express.Router() ile rotaları tanımla.

        [ ] GET / rotasını oluştur: Tüm logları veritabanından çeker ve JSON olarak döner.

        [ ] POST / rotasını oluştur: Gelen veriyi doğrular, sunucu tarafında timestamp ekler ve veritabanına kaydeder.

        [ ] server.js içinde bu rotaları /api/logs altında kullanıma aç.

    1.5. API Testi

        [ ] Postman veya benzeri bir araç kullanarak POST /api/logs ile birkaç veri ekle.

        [ ] GET /api/logs ile eklenen verilerin doğru listelendiğini kontrol et.

        [ ] Hatalı veri göndererek hata yönetiminin çalıştığını doğrula.

Aşama 2: Frontend Kurulumu ve Arayüz Tasarımı (Hedef: 1 Gün)

Bu aşamanın sonunda, temel HTML yapısı ve stilleri tamamlanmış, kullanıcı arayüzü iskeleti hazır olacak.

    2.1. Proje Yapısının Oluşturulması

        [ ] Ana dizinde frontend klasörünü oluştur.

        [ ] İçerisine index.html, styles.css, app.js dosyalarını ekle.

    2.2. HTML İskeletinin Oluşturulması (index.html)

        [ ] Gerekli tüm div ve element'leri (başlık, metin alanı, giriş alanı, istatistikler, yeniden başlatma düğmesi, geçmiş listesi) ID'leriyle birlikte ekle.

        [ ] CSS ve JS dosyalarını link ve script etiketleriyle dahil et.

    2.3. Temel CSS Stillerinin Yazılması (styles.css)

        [ ] Sayfa düzenini (merkezleme, boşluklar) ve temel tipografi stillerini ayarla.

        [ ] Doğru (.correct), yanlış (.incorrect) ve mevcut (.current) karakterler için başlangıç sınıflarını renkleriyle tanımla.

Aşama 3: Çekirdek Test Mantığının Geliştirilmesi (Frontend) (Hedef: 2-3 Gün)

Bu aşamanın sonunda, kullanıcı metinleri yazabilir, WPM ve doğruluk anlık olarak hesaplanır ve test yeniden başlatılabilir.

    3.1. Metin Yönetimi (app.js)

        [ ] Test için birkaç paragrafı bir dizi içinde tanımla.

        [ ] Rastgele bir metin seçip her karakterini bir <span> içine koyarak ekrana yazdıran bir fonksiyon oluştur.

    3.2. Kullanıcı Girdisinin İşlenmesi

        [ ] Giriş alanına bir input event listener ekle.

        [ ] Her girdide, yazılan metni orijinal metinle karşılaştır ve <span>'lere anlık olarak .correct veya .incorrect sınıflarını ata.

    3.3. Zamanlayıcı ve Hesaplamalar

        [ ] İlk tuşa basıldığında setInterval ile zamanlayıcıyı başlatan bir mantık kur.

        [ ] Her input olayında anlık WPM ve doğruluk hesaplamalarını yapıp arayüzü güncelle.

    3.4. Test Durum Yönetimi

        [ ] Metin tamamen doğru yazıldığında testi bitir: zamanlayıcıyı durdur ve giriş alanını devre dışı bırak.

        [ ] Yeniden başlatma düğmesine tıklandığında tüm değişkenleri sıfırlayan ve yeni bir test başlatan bir fonksiyon bağla.

Aşama 4: Yerel Veri Yönetimi (Frontend) (Hedef: 1 Gün)

Bu aşamanın sonunda, test sonuçları tarayıcıda saklanacak ve geçmiş sonuçlar listelenecek.

    4.1. localStorage İşlemleri

        [ ] Test sonucunu localStorage'a kaydeden ve okuyan fonksiyonları yaz.

    4.2. Geçmişin Görüntülenmesi

        [ ] Sayfa ilk yüklendiğinde ve her test bittiğinde localStorage'dan alınan sonuçları ekranda listele.

Aşama 5: Backend Entegrasyonu ve Son Dokunuşlar (Hedef: 1-2 Gün)

Bu aşamanın sonunda, proje tamamen işlevsel, entegre edilmiş ve kullanıma hazır hale gelecek.

    5.1. API İletişimi

        [ ] fetch API kullanarak test sonucunu backend'e gönderen bir async fonksiyon yaz.

        [ ] Test bittiğinde bu fonksiyonu çağır.

    5.2. Hata Yönetimi

        [ ] try...catch blokları ile hem frontend (API'ye ulaşılamadığında) hem de backend'de (veritabanı hatası) hata yönetimini ekle.

    5.3. CSS İyileştirmeleri ve Duyarlılık

        [ ] Animasyonlar, geçişler ve :hover efektleri ekleyerek kullanıcı deneyimini iyileştir.

        [ ] @media sorguları kullanarak uygulamanın mobil cihazlarda düzgün görünmesini sağla.

    5.4. Final Testler

        [ ] Tüm işlevleri farklı senaryolarla ve farklı tarayıcılarda test et.

8. Gelecek Geliştirmeler (Opsiyonel)

(Bu bölümde değişiklik yoktur.)

    Grafiksel Raporlar

    Farklı Test Modları

    Metin Seçenekleri

    Kullanıcı Profilleri