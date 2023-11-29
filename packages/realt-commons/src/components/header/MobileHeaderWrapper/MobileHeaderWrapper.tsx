import { Flex } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { IconMenu2, IconX } from "@tabler/icons";
import { useState } from "react";
import classes from "./MobileHeaderWrapper.module.css";

interface MobileHeaderWrapperProps{
    selector: React.ReactNode;
    nav: React.ReactNode|undefined;
    buttons: React.ReactNode
}
export const MobileHeaderWrapper = ({ selector, nav, buttons }: MobileHeaderWrapperProps) => {

    const [menuOpened, setMenuOpened] = useState<boolean>(false);

    const displayMobileMenu = useMediaQuery('(max-width: 768px)');

    return(
        <Flex 
            style={{
                width: '100vw',
                padding: '10px',
                justifyContent: 'space-between'
            }}
        >
            <Flex className={classes.header}>
                {selector}
                {displayMobileMenu ? (
                    <>
                    { menuOpened ? (
                        <IconX style={{ zIndex: 999 }} width={32} height={32} onClick={() => setMenuOpened(false)}/> 
                    ) : (
                        <IconMenu2 width={32} height={32} onClick={() => setMenuOpened(true)}/>     
                    )}
                    </>
                ): undefined}
                {displayMobileMenu ? (
                    <div
                        style={{
                            display: menuOpened ? 'flex' : 'none',
                            flexDirection: 'column',
                            gap: '3rem',
                            alignItems: 'center',
                            position: 'absolute',
                            top: '0',
                            padding: '10px',
                            paddingTop: '68px', //42 + 12px
                            left: 0,
                            height: '100vh',
                            width: '100vw',
                            zIndex: 2,
                            backgroundColor: 'var(--mantine-color-gray-9)',
                        }}
                    >
                        {buttons}
                        <Flex direction={'column'} gap={3}>
                            {nav}
                        </Flex>
                    </div>
                ): (
                    <Flex style={{ flexGrow: 1 }}>
                        <div style={{ flexGrow: 1 }}>
                            {nav}
                        </div>
                        {buttons}
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}