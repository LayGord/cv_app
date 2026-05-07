import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app/App';
import 'app/styles/index.scss';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { BrowserRouter } from 'react-router';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider >
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

