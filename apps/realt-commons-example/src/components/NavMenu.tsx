import { useTranslation } from 'react-i18next';
import { Button, Flex } from '@mantine/core';

export const NavMenu = () => {

    // const { t } = useTranslation('button', { keyPrefix: "menu", i18n: i18n });
    const { t } = useTranslation('button', { keyPrefix: "menu" });

    return(
        <Flex gap={12} justify={"center"}>
            <Button>{t('menuButton1')}</Button>
            <Button>Menu 2</Button>
        </Flex>
    )
}