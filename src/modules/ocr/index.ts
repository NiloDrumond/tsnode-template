import tesseract, { Config } from 'node-tesseract-ocr';
import path from 'path';

const config: Config = {
  lang: 'eng',
  oem: 2,
  psm: 11,
  'user-patterns': path.join(__dirname, 'eng.patterns'),
  tessedit_char_whitelist: '0123456789,',
};

async function ocr(file: string, numbersOnly?: boolean): Promise<string> {
  const text = await tesseract.recognize(file, config);
  return text.replace(/[ ]{2}/g, '4'); // the ocr does not recognize 4 for some reason
}

export { ocr };
