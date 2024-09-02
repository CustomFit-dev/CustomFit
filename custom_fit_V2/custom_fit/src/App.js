import './scss/style.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';
import Form_r from './components/modules/Registrar';
import Form_i from './components/modules/Iniciar';
import Crud from './components/Crud';
import Home_l from './components/Home_L'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/Registro" element={<Form_r />} />
          <Route path="/Iniciar" element={<Form_i />} />
          <Route path="/Crud" element={<Crud />} />
          <Route path="/Home_L" element={<Home_l />} />
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>

    </div>
  );
}

export default App;
