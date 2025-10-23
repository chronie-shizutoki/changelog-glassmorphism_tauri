import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译文件
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';
import ja from './locales/ja.json';

const resources = {
  en: {
    translation: en
  },
  'zh-CN': {
    translation: zhCN
  },
  'zh-TW': {
    translation: zhTW
  },
  ja: {
    translation: ja
  }
};

// 自定义语言检测器，支持更多浏览器语言映射
const customLanguageDetector = {
  name: 'customDetector',
  lookup() {
    // 获取浏览器语言
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 语言映射表
    const langMap = {
      'en': 'en',
      'en-US': 'en',
      'en-GB': 'en',
      'zh': 'zh-CN',
      'zh-CN': 'zh-CN',
      'zh-Hans': 'zh-CN',
      'zh-TW': 'zh-TW',
      'zh-Hant': 'zh-TW',
      'ja': 'ja',
      'ja-JP': 'ja'
    };

    // 首先尝试完整匹配
    if (langMap[browserLang]) {
      return langMap[browserLang];
    }

    // 然后尝试语言代码匹配（忽略地区）
    const langCode = browserLang.split('-')[0];
    if (langMap[langCode]) {
      return langMap[langCode];
    }

    // 默认返回英语
    return 'en';
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React已经默认转义
    },
    
    detection: {
      order: ['localStorage', 'customDetector', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    }
  });

// 注册自定义检测器
i18n.services.languageDetector.addDetector(customLanguageDetector);

export default i18n;
