import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';
import Form_r from './components/modules/Registrar';
import Form_i from './components/modules/Iniciar';
import Crud from './components/Crud';
import Home_l from './components/Home_L';
import Profile from './components/modules/profile';
import Verificar from './components/modules/verificar';
import Domi from './components/domi';
import Proveedor from './components/proveedor';
import Personalizar from './components/Personalizar';
import Admin from './components/admin';
import FormProveedor from './components/modules/FormProveedor';
import ProtectedRoute from './components/modules/ProtectedRoute';
import Checkout from "./components/pages/Checkout"
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div className="App">

      {/* ⬅️ ENVOLVER TODA LA APP */}
      <CartProvider>

        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/Registro" element={<Form_r />} />
          <Route path="/Iniciar" element={<Form_i />} />
          <Route path="/Verificar" element={<Verificar />} />
          <Route path="/Crud" element={<Crud />} />
          <Route path="/Home_L" element={<Home_l />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Domi" element={<Domi />} />
          <Route path="/Prove" element={<Proveedor />} />
          <Route path="/Personalizar" element={<Personalizar />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/Admin"
            element={
              <ProtectedRoute roles={['administrador']}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/FormProveedor" element={<FormProveedor />} />
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>

      </CartProvider>

    </div>
  );
}

export default App;