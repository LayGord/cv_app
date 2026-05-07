import { Navbar } from 'widgets/Navbar';
import { AppRouter } from './providers/RouterProvider';

function App() {
    return (
        <div className="App">
            <Navbar />
            <AppRouter />
        </div>
    );
}

export default App;
