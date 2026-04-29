import { createContext } from "react";

export enum AppTheme {
    LIGHT = 'light',
    DARK = 'dark',
};

export interface ThemeContextProps {
    theme?: AppTheme;
    setTheme?: (theme: AppTheme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});