import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';
import Form_r from './components/modules/Registrar';
import Form_i from './components/modules/Iniciar';
import Crud from './components/Crud';
import Home_l from './components/Home_L';
import Profile from './components/modules/profile';
import axiosP from './components/modules/axiosp';
import Verificar from './components/modules/verificar';
import Domi from './components/domi';
import Proveedor from './components/proveedor';

function App() {
  const { sendUserData } = axiosP();

  return (
    <div className="App">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/Registro" element={<Form_r />} />
          <Route path="/Iniciar" element={<Form_i />} />
          <Route path="/Verificar" element={<Verificar />} />
          <Route path="/Crud" element={<Crud />} />
          <Route path="/Home_L" element={<Home_l />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/Home" />} />
          <Route path="/Domi" element={<Domi />} />
          <Route path="/Prove" element={<Proveedor />} />
        </Routes>
    </div>
  );
}

export default App;
