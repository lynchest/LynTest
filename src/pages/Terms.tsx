import React from "react";
import TextPage from "./TextPage";

const Terms = () => {
  return (
    <TextPage title="Kullanım Koşulları">
      <div className="terms-container p-6 max-w-4xl mx-auto">
        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Bu web sitesi, kullanıcıların klavye yazma hızlarını ölçmelerine imkân tanıyan basit bir uygulama olarak sunulmaktadır. Hizmet yalnızca kişisel ve eğitim amaçlı kullanım için tasarlanmıştır.
        </p>

        <ol className="space-y-8">
          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Hizmetin Kapsamı</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Bu web sitesi, kullanıcıların klavye yazma hızlarını ölçmelerine imkân tanıyan basit bir uygulama olarak sunulmaktadır. Hizmet yalnızca kişisel ve eğitim amaçlı kullanım için tasarlanmıştır.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Kullanım Kuralları</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Kullanıcı, uygulamayı yalnızca yasal amaçlarla ve amacına uygun şekilde kullanmayı kabul eder.
              Site üzerinde herhangi bir zararlı yazılım, saldırı veya kötüye kullanım teşebbüsünde bulunulması yasaktır.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Veri Saklama ve Gizlilik</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Uygulama, kullanıcıya ait verileri yalnızca tarayıcı depolamasında tutar ve tarafımıza iletmez.
              Site, <strong>Vercel</strong> altyapısı üzerinde barındırılmaktadır. Vercel, kendi gizlilik politikası kapsamında anonim teknik veriler toplayabilir. Ayrıntılar için Vercel Gizlilik Politikası incelenebilir.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Sorumluluk Reddi</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Uygulama tarafından sağlanan sonuçların (ör. yazma hızı ölçümleri) doğruluğu veya kesintisiz çalışacağı garanti edilmez.
              Hizmetin kullanımı sırasında ortaya çıkabilecek doğrudan veya dolaylı herhangi bir kayıp, zarar veya sorundan site sahibi sorumlu tutulamaz.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Değişiklik Hakkı</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Site sahibi, bu Kullanım Şartları’nı önceden bildirimde bulunmaksızın değiştirme hakkını saklı tutar. Güncel sürüm her zaman bu sayfada yayınlanır.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">İletişim</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Bu Kullanım Şartları ile ilgili sorularınız için bizimle iletişime geçebilirsiniz: 📧
              <a href="mailto:lynchest@proton.me" className="text-blue-600 hover:underline dark:text-blue-400"> lynchest@proton.me</a>
            </p>
          </li>
        </ol>
      </div>
    </TextPage>
  );
};

export default Terms;
