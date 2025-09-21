import React from "react";
import TextPage from "./TextPage";

const About = () => {
  return (
    <TextPage title="Hakkımızda">
      <div className="about-container p-6 max-w-4xl mx-auto">
        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Bu proje, tek bir geliştirici tarafından kişisel öğrenme ve kendini geliştirme amacıyla hayata geçirilmiştir. Amacım, hem yazılım becerilerimi ilerletmek hem de kullanıcıların klavye yazma hızlarını kolayca ölçebilecekleri basit ve işlevsel bir araç sunmaktır.
        </p>

        <ol className="space-y-8">
          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Proje Amacı</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Bu web sitesi, kullanıcıların klavye yazma hızlarını ölçmelerine imkân tanıyan basit bir uygulama olarak sunulmaktadır. Hizmet yalnızca kişisel ve eğitim amaçlı kullanım için tasarlanmıştır.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Veri Gizliliği ve Güvenliği</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Uygulama tamamen tarayıcı üzerinde çalışır. Veriler yalnızca kullanıcı cihazında tutulur, hiçbir şekilde sunucuya gönderilmez. Bu sayede hızlı, güvenli ve gizliliğe saygılı bir deneyim sağlar.
            </p>
          </li>

          <li>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Açık Kaynak Katkısı</h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              Ayrıca proje, yazılım topluluğuna katkı sağlamak amacıyla açık kaynak olarak <a href="https://github.com/lynchest/LynTest" className="text-blue-600 hover:underline dark:text-blue-400">GitHub</a> üzerinde paylaşılmaktadır. Herkes kodu inceleyebilir, geliştirmelere katkıda bulunabilir veya kendi projeleri için uyarlayabilir.
            </p>
          </li>
        </ol>
      </div>
    </TextPage>
  );
};

export default About;
