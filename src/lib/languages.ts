import enData from './locales/en.json';
import trData from './locales/tr.json';

export const wordBanks = {
  en: enData.wordBank,
  tr: trData.wordBank,
};

export const keyboardLayouts = {
  en: enData.keyboardLayout,
  tr: trData.keyboardLayout,
};

export const fingerMappings = {
  en: enData.fingerMapping,
  tr: trData.fingerMapping,
};

export const translations = {
  en: enData.translations,
  tr: trData.translations,
};

export type Language = keyof typeof wordBanks;

export const generateRandomText = (maxChars: number = 50, language: Language = 'en'): string => {
  const bank = wordBanks[language];
  let line = "";
  while (true) {
    const randomIndex = Math.floor(Math.random() * bank.length);
    const word = bank[randomIndex];
    if (line.length + word.length + 1 > maxChars) {
      break;
    }
    line += (line.length > 0 ? " " : "") + word;
  }
  // Eğer satır boş kalırsa (ilk kelime bile sığmazsa), en az bir kelime ekle
  if (line.length === 0) {
    const randomIndex = Math.floor(Math.random() * bank.length);
    line = bank[randomIndex];
  }
  return line;
};
