import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";
import localEn from "@/assets/languages/en.json";
Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context(
    "@/assets/languages",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages: LocaleMessages = {};
  locales.keys().forEach(key => {
    console.log("Key is", key);
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  /* skip the function call in a test environment */
  messages:
    process.env.NODE_ENV === "test"
      ? {
          en: localEn
        }
      : loadLocaleMessages()
});
