import { translations, Language } from './languages';
import tr from './locales/tr.json'; // tr.json dosyasını içe aktar

export const textSources = {
  literature: () => {
    // Tüm edebiyat metinlerini birleştir ve her metin arasına iki yeni satır ekle
    const combinedLiterature = tr.textSources.literature.join('\n\n');
    return Promise.resolve(combinedLiterature);
  },
  randomWords: () => Promise.resolve("rastgele kelimelerden oluşan bir metin"),
  code: () => Promise.resolve("const greet = () => 'Hello, World!';"),
};

export type TextSource = keyof typeof textSources;

export const getTextSourceOptions = (language: Language) => {
  const t = translations[language];
  return [
    { value: "literature", label: t.literature },
    { value: "randomWords", label: t.randomWords },
    { value: "code", label: t.code },
  ];
};
