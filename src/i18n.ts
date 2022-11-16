import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zhCN from "./locales/zh-CN"
import enUS from "./locales/en-US"
import zhTW from "./locales/zh-TW"

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
// ISO 639-3 language codes: https://iso639-3.sil.org/code_tables/639/data/all
const resources = {
    'zh-CN': {
      translation: zhCN
    },
    'zh-TW': {
        translation: zhTW
    },
    'en-US': {
        translation: enUS
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en-US", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
