import React from "react";
import TextPage from "./TextPage";

const Privacy = () => {
  return (
    <TextPage title="Gizlilik Politikası">
      <div className="privacy-container p-6 max-w-4xl mx-auto">
        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Bu web sitesi, kullanıcıların gizliliğini ve verilerinin güvenliğini ön planda tutar.
        </p>

        <ol className="space-y-8">
          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Veri Toplama ve Kullanım</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Uygulama, kullanıcıya ait hiçbir kişisel veriyi toplamaz.
              Yazma hızınıza ilişkin bilgiler yalnızca cihazınızdaki tarayıcı depolamasında
              (<strong>LocalStorage / IndexedDB</strong>) tutulur. Bu veriler cihazınızdan dışarı çıkmaz,
              bizimle paylaşılmaz ve üçüncü kişilere aktarılmaz.
              İstediğiniz zaman tarayıcı ayarlarınızdan bu verileri silebilirsiniz.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Barındırma ve Performans Verileri</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Site, <strong>Vercel</strong> altyapısı üzerinden barındırılmaktadır.
              Vercel, platformun performansını, güvenliğini ve istatistiklerini ölçmek amacıyla anonim kullanım verileri
              (ör. ziyaretçi sayısı, erişim süreleri, hata raporları, teknik loglar) toplayabilir.
              Bu veriler yalnızca istatistiksel ve teknik amaçlarla kullanılmakta olup, doğrudan bizim tarafımızdan işlenmemektedir.
              Ayrıntılı bilgi için Vercel Gizlilik Politikası incelenebilir.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Üçüncü Taraflarla Veri Paylaşımı</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Uygulama, kullanıcı verilerini hiçbir üçüncü tarafla paylaşmaz.
              Vercel tarafından toplanan teknik veriler, yalnızca barındırma hizmetinin sağlanması kapsamında işlenmektedir.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Kullanıcı Hakları</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Bu uygulama kapsamında herhangi bir kişisel veri toplanmadığı için, kullanıcıların kimliklerine dair hiçbir bilgi işlenmemektedir.
              Tarayıcı depolamasındaki veriler tamamen sizin kontrolünüzdedir ve dilediğiniz an silebilirsiniz.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">İletişim</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz: 📧
              <a href="mailto:lynchest@proton.me" className="text-blue-600 hover:underline dark:text-blue-400"> lynchest@proton.me</a>
            </p>
          </li>
        </ol>
      </div>
    </TextPage>
  );
};

export default Privacy;
