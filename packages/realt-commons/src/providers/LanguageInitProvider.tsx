import { getCookie } from "cookies-next";
import { FC, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

export const LanguageInit: FC = () => {

  const [lng,setLng] = useState<string>('fr');

  useEffect(() => { 
    const lng = (getCookie('react-i18next') || 'fr') as string;
    setLng(lng);
  },[]);

  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [i18n, lng]);

  return null;
};