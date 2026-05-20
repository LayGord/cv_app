import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app/App';
import 'app/styles/index.scss';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { BrowserRouter } from 'react-router';
import { StoreProvider } from 'app/providers/StoreProvider';
import 'shared/config/i18n/i18n';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <ThemeProvider >
                    <App />
                </ThemeProvider>
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>
);

