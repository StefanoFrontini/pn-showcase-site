import { DEFAULT_LANG, langCodes, LS_LANG_PROP_NAME } from "@utils/constants";
import { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import chartConfig from "src/components/Numeri/shared/chart-config";
import { VegaLocale } from "src/components/Numeri/shared/locale/vegaLocaleType";
import { I18n, LangCode } from "../model";

interface ILangContext {
  lang: LangCode;
  changeLanguage: (lang: LangCode) => void;
  translations: I18n;
  vegaLocale: VegaLocale;
}

const LangContext = createContext<ILangContext>({
  lang: DEFAULT_LANG,
  changeLanguage: (lang: LangCode) => {},
  translations: {},
  vegaLocale: {
    formatLocale: chartConfig.formatLocale,
    timeFormatLocale: chartConfig.timeFormatLocale,
  },
});

interface Props {
  children: ReactNode;
  lang: LangCode;
  translations: I18n;
  vegaLocale: VegaLocale;
}

export const LangProvider: React.FC<Props> = ({
  children,
  lang = DEFAULT_LANG,
  translations,
  vegaLocale,
}) => {
  const [selectedLang, setSelectedLang] = useState<LangCode>(
    langCodes.find((l) => l === lang) ?? DEFAULT_LANG
  );
  const router = useRouter();
  const { pathname, query } = router;

  const changeLanguageHandler = useCallback(
    (newLang: LangCode) => {
      sessionStorage.setItem(LS_LANG_PROP_NAME, newLang);
      setSelectedLang(() => newLang);
      // redirect to page
      // the reload is needed because the _document is rendered server side and
      // it isn't re-rendered when changes occur on client side. This means that the lang
      // attribute isn't changed on router navigation, but only on refresh
      router
        .replace({ pathname, query: { lang: newLang } }, undefined, {
          shallow: true,
        })
        .then(() => router.reload());
    },
    [pathname, query]
  );

  // Sync context with router
  useEffect(() => {
    if (
      query.lang &&
      langCodes.includes(query.lang as LangCode) &&
      lang !== query.lang
    ) {
      setSelectedLang(query.lang as LangCode);
      sessionStorage.setItem(LS_LANG_PROP_NAME, query.lang as string);
    }
  }, [query.lang, lang]);

  const obj = useMemo(
    () => ({
      lang: selectedLang,
      changeLanguage: changeLanguageHandler,
      translations,
      vegaLocale,
    }),
    [selectedLang, changeLanguageHandler, translations]
  );

  return <LangContext.Provider value={obj}>{children}</LangContext.Provider>;
};

export default LangContext;
