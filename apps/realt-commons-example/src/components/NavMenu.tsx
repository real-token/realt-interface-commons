import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';

export const NavMenu = () => {

    // const { t } = useTranslation('button', { keyPrefix: "menu", i18n: i18n });
    const { t } = useTranslation('button', { keyPrefix: "menu" });

    return(
        <>
            <Button>{t('menuButton1')}</Button>
            <Button>Menu 2</Button>
        </>
    )
}