// import detectNavigatorLanguage from '@digihcs/util/lib/locale/detectNavigatorLanguage'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LocalStorageItemKeys } from 'src/constant'

import english from './languages/en.json'
import vietnamese from './languages/vi.json'
import chinese from './languages/zh.json'

// import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const resources = {
  en: {
    translation: english
  },
  vi: {
    translation: vietnamese
  },
  zh: {
    translation: chinese
  }
}

i18n
  //   // detect user language
  //   // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //   .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    // lng: detectNavigatorLanguage(),
    // lng: 'en', // default
    lng: localStorage.getItem(LocalStorageItemKeys.I18N_LANGUAGE),
    fallbackLng: ['en', 'vi', 'zh'],
    debug: false
  })

export default i18n
