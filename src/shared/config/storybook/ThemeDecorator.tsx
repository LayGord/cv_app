import { AppTheme, ThemeProvider } from "app/providers/ThemeProvider";

export const ThemeDecorator = (theme: AppTheme) => (Story: any) => {
    return (
        <ThemeProvider initialTheme={theme}>
            <div id="theme-container">
                <Story />
            </div>
        </ThemeProvider>
    )
}