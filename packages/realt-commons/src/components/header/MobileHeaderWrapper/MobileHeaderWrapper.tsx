import { Flex, MediaQuery, createStyles } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { IconMenu2, IconX } from "@tabler/icons";
import { useState } from "react";

interface StyleProps{
    menuOpened: boolean
}

const useStyles = createStyles((theme, { menuOpened }: StyleProps) => ({
    headerContainer: {
        width: '100vw',
        padding: '10px'
    },
    menuButton: {
        zIndex: 999
    },
    header: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        '&:hover':{
            cursor: "pointer"
        }
    },
    mobileMenu: {
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
        backgroundColor: theme.colors.gray[9],
    }
}))

interface MobileHeaderWrapperProps{
    selector: React.ReactNode;
    nav: React.ReactNode|undefined;
    buttons: React.ReactNode
}
export const MobileHeaderWrapper = ({ selector, nav, buttons }: MobileHeaderWrapperProps) => {

    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    const { classes } = useStyles({ menuOpened });
    
    return(
        <Flex justify={'space-between'} className={classes.headerContainer}>
            <Flex className={classes.header}>
                {selector}
                <MediaQuery largerThan={768} styles={{ display: 'none' }}>
                    { menuOpened ? (
                        <IconX className={classes.menuButton} width={32} height={32} onClick={() => setMenuOpened(false)}/> 
                    ) : (
                        <IconMenu2 width={32} height={32} onClick={() => setMenuOpened(true)}/>     
                    )}
                </MediaQuery>
                <MediaQuery largerThan={768} styles={{ display: 'none' }}>
                    <div className={classes.mobileMenu}>
                        {buttons}
                        <Flex direction={'column'} gap={3}>
                            {nav}
                        </Flex>
                    </div>
                </MediaQuery>
                <MediaQuery query={'(max-width: 768px)'} styles={{ display: 'none' }}> 
                    <Flex sx={{ flexGrow: 1 }}>
                        <div style={{ flexGrow: 1 }}>
                            {nav}
                        </div>
                        {buttons}
                    </Flex>
                </MediaQuery>
            </Flex>
        </Flex>
    )
}