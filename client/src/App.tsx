import { useAuth } from './context/AuthContext';

import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

function App() {
  const { id } = useAuth();

  return id ? <Dashboard /> : <Login />;
}

export default App;
