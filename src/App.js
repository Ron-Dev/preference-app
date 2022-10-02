import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home-page';
import SignIn from './views/sign-in-page';
import ProtectedRoute from './components/protected-route';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
