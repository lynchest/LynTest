# Yazım İstatistikleri Arayüzü Yol Haritası

Bu belge, kullanıcıya ait yazım istatistiklerini gösteren modern ve okunabilir bir arayüzün geliştirilmesi için bir yol haritası sunmaktadır.

## 1. Gereksinim Analizi

*   **Ana Hedef:** Kullanıcıların yazım performanslarını anlamalarına yardımcı olacak kapsamlı ve görsel olarak çekici bir istatistik arayüzü sağlamak.
*   **Metrikler:**
    *   Ortalama kelime hatası sayısı (test başına veya genel ortalama)
    *   Yanlış basılan tuşların ortalaması (test başına veya genel ortalama)
    *   Diğer potansiyel metrikler: Doğruluk oranı, WPM (dakikadaki kelime sayısı), ham WPM, tutarlılık.
*   **Görselleştirme:**
    *   Etkileşimli çubuk grafikler (örneğin, zaman içindeki hata sayısı değişimi).
    *   Pasta grafikler (örneğin, hata türlerinin dağılımı).
    *   Diğer potansiyel grafikler: Çizgi grafikler (WPM gelişimi).
*   **Tasarım İlkeleri:** Sade, modern, kullanıcı dostu ve okunabilir.
*   **Erişim:** Ana sayfadan erişilebilir bir sayfa veya modal olarak sunulabilir.

## 2. Tasarım Kararları

*   **Arayüz Tipi:** Mevcut dosya yapısında `src/components/StatsModal.tsx` bulunduğundan, başlangıçta istatistikleri bir **modal** içinde sunmak daha uygun olacaktır. Bu, ana sayfa akışını kesintiye uğratmadan hızlı erişim sağlar. Daha sonra tam sayfa bir görünüme genişletilebilir.
*   **UI Bileşenleri:**
    *   İstatistik değerlerini göstermek için `src/components/ui/card.tsx` veya benzeri kart bileşenleri kullanılabilir.
    *   Grafikler için `src/components/ui/chart.tsx` bileşeni veya uygun bir grafik kütüphanesi (örneğin, Recharts, Chart.js) entegre edilebilir.
    *   Modal için `src/components/ui/dialog.tsx` kullanılabilir.
    *   Genel düzen için Tailwind CSS sınıfları kullanılacaktır.

## 3. Veri Entegrasyonu

*   **Veri Kaynağı:** Kullanıcının yazım testlerinden elde edilen geçmiş veriler (`useTypingHistory.ts` veya benzeri bir hook/servis aracılığıyla).
*   **Veri İşleme:** Ham verilerden ortalama kelime hatası, yanlış basılan tuşlar gibi metriklerin hesaplanması. Bu mantık `src/hooks/useTypingStats.ts` içinde veya yeni bir yardımcı fonksiyonda geliştirilebilir.
*   **Veri Yapısı:** Grafiklerin ve metriklerin kolayca tüketebileceği uygun bir veri yapısı oluşturulması.

## 4. UI Geliştirme

*   **StatsModal Bileşeni:** `src/components/StatsModal.tsx` dosyasını güncelleyerek veya yeni bir bileşen oluşturarak modal yapısını kurma.
*   **Metrik Gösterimi:** Hesaplanan metrikleri kartlar veya benzeri düzenlerle modal içinde sergileme.
*   **Grafik Konteynerleri:** Grafiklerin yerleştirileceği alanları tanımlama.

## 5. Grafik Entegrasyonu

*   **Grafik Kütüphanesi:** `src/components/ui/chart.tsx` bileşeninin yeteneklerini değerlendirme. Eğer yeterli değilse, Recharts veya Chart.js gibi bir kütüphane entegre etme.
*   **Çubuk Grafik:** Zaman içindeki hata sayılarını veya WPM gelişimini gösteren bir çubuk grafik oluşturma.
*   **Pasta Grafik:** Hata türlerinin (örneğin, kelime hatası, tuş hatası) dağılımını gösteren bir pasta grafik oluşturma.
*   **Etkileşim:** Grafikleri etkileşimli hale getirme (tooltips, zoom vb.).

## 6. Test Etme

*   **Birim Testleri:** Yeni geliştirilen bileşenler ve veri işleme mantığı için birim testleri yazma (`src/__tests__/unit/components/StatsModal.test.tsx` gibi).
*   **Entegrasyon Testleri:** Modalın ana sayfadan doğru şekilde açılıp kapandığını ve verileri doğru gösterdiğini doğrulama.
*   **Kullanılabilirlik Testleri:** Arayüzün sade, kullanıcı dostu ve okunabilir olduğunu doğrulama.

## Sonraki Adımlar

1.  `stats-roadmap.md` dosyasını oluştur.
2.  `src/hooks/useTypingStats.ts` dosyasını inceleyerek mevcut istatistik hesaplama mantığını anla.
3.  `src/components/StatsModal.tsx` dosyasını inceleyerek mevcut modal yapısını anla.
4.  Gerekli istatistikleri hesaplamak için `useTypingStats.ts` dosyasını güncelle veya yeni yardımcı fonksiyonlar ekle.
5.  `src/components/StatsModal.tsx` içinde metrikleri ve grafikleri gösterecek UI'ı geliştir.
