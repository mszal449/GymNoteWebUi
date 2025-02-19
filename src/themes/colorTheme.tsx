import {
    Card,
    Container,
    createTheme,
    DEFAULT_THEME,
    MantineColorsTuple,
    Paper,
    rem,
    Select,
    Table
} from "@mantine/core";
import type { MantineThemeOverride } from "@mantine/core";


const niceBlue: MantineColorsTuple = [
    '#ffeaf3',
    '#fcd4e1',
    '#f4a7bf',
    '#ec779c',
    '#e64f7e',
    '#e3366c',
    '#e22862',
    '#c91a52',
    '#b41148',
    '#9f003e'
];



export const LightTheme: MantineThemeOverride = createTheme({
    ...DEFAULT_THEME,
    colors: {
        "nice-blue": niceBlue,
    },
});