import { Navbar } from 'widgets/Navbar';
import { AppRouter } from './providers/RouterProvider';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ResumeSaveBtn } from 'features/SaveResumeToIdb';
import { generateResumePreviewUrl } from 'features/RenderResumeToPdf';

function App() {
    return (
        <div className="App">
            <Navbar
                ResumeSaveBtn={<ResumeSaveBtn previewGenerateCb={generateResumePreviewUrl} />}
                ThemeSwitcher={<ThemeSwitcher />}
                LangSwitcher={<LangSwitcher />}
            />
            <AppRouter />
        </div>
    );
}

export default App;
