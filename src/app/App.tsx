import { MainPage } from 'pages/MainPage';
import React, { Suspense } from 'react';
import { Navbar } from 'widgets/Navbar';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <MainPage />
            </Suspense>
        </div>
    );
}

export default App;
