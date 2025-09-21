# LynTest - Hızlı Yazma Testi Uygulaması

**[Web Sitesini Ziyaret Edin!](https://lyntest.lynchest.com)**

LynTest, kullanıcıların yazma hızlarını ve doğruluklarını test etmelerini sağlayan modern bir hızlı yazma uygulamasıdır. Temiz ve sezgisel bir arayüzle, kullanıcılar farklı metin kaynakları ve diller üzerinde pratik yapabilir, performanslarını takip edebilir ve yazma becerilerini geliştirebilirler.

![LynTest Ana Ekranı](assets/homescreen.png)

## Özellikler

- **Kapsamlı Yazma Testleri:** Kullanıcıların WPM (dakika başına kelime), doğruluk oranları ve ham WPM gibi metriklerle yazma hızlarını ve doğruluklarını detaylı bir şekilde ölçer.
- **Çoklu Dil ve Metin Kaynağı Desteği:** Farklı dillerde (Türkçe, İngilizce vb.) ve çeşitli metin kaynaklarından (rastgele kelimeler, alıntılar, kod parçacıkları) test yapma imkanı sunar.
- **Detaylı Performans Analizi:** Her test sonrası kapsamlı istatistikler ve analizler sunarak kullanıcıların güçlü ve zayıf yönlerini anlamalarına yardımcı olur.
- **Yazma Geçmişi ve İlerleme Takibi:** Önceki test sonuçlarını kaydeder, grafiklerle ilerlemeyi görselleştirir ve zaman içindeki gelişimi takip etme olanağı sağlar.
- **Duyarlı ve Modern Arayüz:** Masaüstü, tablet ve mobil cihazlarda sorunsuz ve estetik bir deneyim sunan duyarlı tasarım.
- **Esnek Özelleştirilebilir Ayarlar:** Kullanıcıların test süresi, metin uzunluğu, dil, tema ve diğer tercihleri kişiselleştirmesine olanak tanır.
- **Kullanıcı Dostu Kontroller:** Test sırasında kolayca yeniden başlatma, atlama ve ayarları değiştirme gibi işlevler sunar.
- **Erişilebilirlik Odaklı Tasarım:** `shadcn-ui` bileşenleri sayesinde erişilebilirlik standartlarına uygun bir kullanıcı deneyimi sağlar.
- **Sağlam Test Altyapısı:** Uygulamanın kararlılığını ve doğruluğunu garanti eden kapsamlı birim ve uçtan uca testler (`Cypress`, `Jest`, `React Testing Library`).
- **Gizlilik Odaklı:** Tüm kullanıcı verileri (yazma geçmişi, ayarlar vb.) yalnızca yerel depolamada saklanır ve hiçbir sunucuya gönderilmez.

## Teknolojiler

Bu proje aşağıdaki teknolojilerle geliştirilmiştir:

- **Vite:** Hızlı geliştirme deneyimi için yeni nesil frontend aracı.
- **TypeScript:** Daha güvenli ve ölçeklenebilir kod için JavaScript'in tip güvenli bir üst kümesi.
- **React:** Kullanıcı arayüzleri oluşturmak için deklaratif, bileşen tabanlı bir JavaScript kütüphanesi.
- **shadcn-ui:** Erişilebilir ve özelleştirilebilir UI bileşenleri kütüphanesi.
- **Tailwind CSS:** Hızlı ve esnek UI geliştirme için bir yardımcı program öncelikli CSS çerçevesi.

## Yerel Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### Önkoşullar

- Node.js (tercihen [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) ile)
- npm (Node.js ile birlikte gelir)

### Adımlar

1.  **Depoyu Klonlayın:**
    ```sh
    git clone https://github.com/lynchest/LynTest.git
    ```

2.  **Proje Dizinine Gidin:**
    ```sh
    cd LynTest
    ```

3.  **Bağımlılıkları Yükleyin:**
    ```sh
    npm install
    ```

4.  **Geliştirme Sunucusunu Başlatın:**
    ```sh
    npm run dev
    ```
    Uygulama genellikle `http://localhost:3030` adresinde çalışacaktır.

## Katkıda Bulunma

Bağış alabilmem için 18 yaşımı doldurmam gerekiyor, onun yerine projeye katkıda bulunarak bana destek olabilirsiniz! Katkılarınızı memnuniyetle karşılarız! Lütfen `CONTRIBUTING.md` dosyasını inceleyerek nasıl katkıda bulunabileceğinizi öğrenin.

## Lisans

Bu proje GNU General Public License v3.0 altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
