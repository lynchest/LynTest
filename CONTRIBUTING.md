# LynTest'e Katkıda Bulunma Rehberi

LynTest projesine gösterdiğiniz ilgi için teşekkür ederiz! Bu belge, projeye nasıl katkıda bulunabileceğiniz konusunda size yol göstermektedir. Her türlü katkı (hata raporları, özellik istekleri, kod katkıları, dokümantasyon iyileştirmeleri vb.) memnuniyetle karşılanır.

## Davranış Kuralları

Bu projeye katılan herkesin, topluluğumuz için olumlu bir ortam sağlamak amacıyla [Davranış Kurallarımıza](CODE_OF_CONDUCT.md) uyması beklenir.

## Nasıl Katkıda Bulunulur?

### Hata Raporları

Bir hata bulursanız, lütfen GitHub Issues bölümünde bir rapor oluşturun. Hata raporunuzda aşağıdaki bilgileri sağlamaya çalışın:

- Hatayı yeniden oluşturmak için adımlar.
- Beklenen davranış.
- Gerçekleşen davranış.
- Kullandığınız ortam (işletim sistemi, tarayıcı, Node.js sürümü vb.).

### Özellik İstekleri

Yeni bir özellik önermek isterseniz, lütfen GitHub Issues bölümünde bir özellik isteği oluşturun. Fikrinizi ve neden bu özelliğin faydalı olacağını düşündüğünüzü açıklayın.

### Kod Katkıları

Koda katkıda bulunmak isterseniz, lütfen aşağıdaki adımları izleyin:

1.  **Depoyu Fork Edin:** Kendi GitHub hesabınıza LynTest deposunu fork edin.
2.  **Depoyu Klonlayın:** Fork ettiğiniz depoyu yerel makinenize klonlayın.
    ```sh
    git clone https://github.com/lynchest/LynTest.git
    cd LynTest
    ```
3.  **Yeni Bir Dal Oluşturun:** Değişiklikleriniz için yeni bir dal oluşturun.
    ```sh
    git checkout -b ozellik/yeni-ozellik-adi
    # veya
    git checkout -b hata-duzeltme/hata-adi
    ```
4.  **Değişikliklerinizi Yapın:** Kod değişikliklerinizi yapın. Lütfen kodlama standartlarına uymaya çalışın.
5.  **Testleri Çalıştırın:** Değişikliklerinizin mevcut testleri geçip geçmediğini ve yeni özellikler için testler eklediyseniz onların da çalıştığından emin olun.
    ```sh
    npm test
    ```
6.  **Değişikliklerinizi Kaydedin:** Değişikliklerinizi anlamlı commit mesajlarıyla kaydedin.
    ```sh
    git add .
    git commit -m "feat: yeni özellik eklendi"
    # veya
    git commit -m "fix: hata düzeltildi"
    ```
7.  **Değişikliklerinizi Push Edin:** Değişikliklerinizi kendi fork'unuza push edin.
    ```sh
    git push origin ozellik/yeni-ozellik-adi
    ```
8.  **Pull Request (PR) Oluşturun:** Orijinal LynTest deposuna bir Pull Request oluşturun. PR açıklamanızda, yaptığınız değişiklikleri, neden yapıldığını ve neyi çözdüğünü açıkça belirtin.

### Dokümantasyon Katkıları

Dokümantasyon iyileştirmeleri de çok değerlidir. Yazım hatalarını düzeltmekten, yeni bölümler eklemeye kadar her türlü dokümantasyon katkısı memnuniyetle karşılanır.

## Geliştirme Ortamı

Yerel geliştirme ortamınızı kurmak için `README.md` dosyasındaki "Yerel Kurulum" bölümüne bakın.

---

Bu rehber, LynTest projesine katkıda bulunmanızı kolaylaştırmayı amaçlamaktadır. Katkılarınız için şimdiden teşekkür ederiz!
