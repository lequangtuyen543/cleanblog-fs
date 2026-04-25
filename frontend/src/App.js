import './App.css';
import AllRoute from './components/AllRoute';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <AllRoute />
    </SettingsProvider>
  );
}

export default App;