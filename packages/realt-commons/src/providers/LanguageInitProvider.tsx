import { getCookie } from "cookies-next";
import { FC, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { i18n } from 'i18next';

interface LanguageInitProps{
  i: i18n
}
export const LanguageInit: FC<LanguageInitProps> = ({ i }) => {

  const [lng,setLng] = useState<string>('fr');
  useEffect(() => { 
    const lng = (getCookie('react-i18next') || 'fr') as string;
    setLng(lng);
  },[]);

  useEffect(() => {
    if (i.language !== lng) {
      i.changeLanguage(lng);
    }
  }, [i, lng]);

  return null;
};