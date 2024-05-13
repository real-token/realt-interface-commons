import { MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { getCookie, setCookies } from "cookies-next";
import { useEffect } from "react";

export const ColorSchemeManager = () => {

    const { setColorScheme, colorScheme } = useMantineColorScheme(); 

    useEffect(() => { 
        const themeColor = (getCookie('mantine-color-scheme') || 'dark') as MantineColorScheme;
        setColorScheme(themeColor);
    },[]);
    
    const toggleColorScheme = (
        nextColorScheme: MantineColorScheme = colorScheme === 'dark' ? 'light' : 'dark'
    ) => {
        setColorScheme(nextColorScheme);
        setCookies('mantine-color-scheme', nextColorScheme);
    };

    useHotkeys([['mod+J', () => toggleColorScheme()]]);

    return(<></>)
}