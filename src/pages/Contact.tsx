import React from "react";
import TextPage from "./TextPage";

const Contact = () => {
  return (
    <TextPage title="İletişim">
      <div className="contact-container p-6 max-w-4xl mx-auto">
        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Sorularınız veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz: 📧
          <a href="mailto:lynchest@proton.me" className="text-blue-600 hover:underline dark:text-blue-400"> lynchest@proton.me</a>
        </p>
      </div>
    </TextPage>
  );
};

export default Contact;
