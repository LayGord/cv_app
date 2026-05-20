import { Navbar } from 'widgets/Navbar';
import { AppRouter } from './providers/RouterProvider';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';

function App() {
    return (
        <div className="App">
            <Navbar 
                ThemeSwitcher={<ThemeSwitcher />}
                LangSwitcher={<LangSwitcher />}
            />
            <AppRouter />
        </div>
    );
}

export default App;
