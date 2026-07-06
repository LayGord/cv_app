import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend';
import { LANG_KEY } from 'shared/const/localstorage';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: localStorage.getItem(LANG_KEY) || 'en-EN',
        fallbackLng: 'en-EN',
        supportedLngs: ['en-EN', 'ru-RU'],
        ns: ['translation', 'resume', 'preview'],
        defaultNS: 'translation',
        debug: process.env.NODE_ENV === 'development',
        interpolation: { escapeValue: false },
        react: { useSuspense: true },
    });


export default i18n;