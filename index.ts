import { Theme } from "@emotion/react";

type TThemeMode = "light" | "dark";

declare module "@emotion/react" {
    export interface Theme {
        typography: {
            fontFamily: string;
        };
        palette: {
            type: TThemeMode;
            primary: {
                textColor: string;
                backgroundColor: string;
            };
            secondary: {
                textColor: string;
                backgroundColor: string;
            };
        };
    }
}

const dark: Theme = {
    typography: {
        fontFamily: "Lato, Arial, sans-serif",
    },
    palette: {
        type: "dark",
        primary: {
            textColor: "white",
            backgroundColor: "black"
        },
        secondary: {
            textColor: "green",
            backgroundColor: "red"
        }
    }
};

const light: Theme = {
    typography: {
        fontFamily: "Lato, Arial, sans-serif",
    },
    palette: {
        type: "dark",
        primary: {
            textColor: "white",
            backgroundColor: "black"
        },
        secondary: {
            textColor: "green",
            backgroundColor: "red"
        }
    }
};

/**
 * You may get an issue if import ThemeProvider from @emotion/react directly in your app
 * To solve the issue, re-export ThemeProvider and useTheme from this file
 *  and import ThemeProvider, useTheme and makeStyles into app from this file
 */
export { ThemeProvider, useTheme } from "@emotion/react";
export { default as makeStyles } from "./make-styles";
