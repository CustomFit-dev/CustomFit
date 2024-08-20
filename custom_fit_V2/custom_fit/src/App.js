import './scss/style.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';
import Form_R from './components/modules/Registrar';
import Form_I from './components/modules/Iniciar';
import Crud from './components/Crud';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/inicio" component={Form_I} />
          <Route path="/registro" component={Form_R} />
          <Route path="/Iniciar" element={<Form_I />} />
          <Route path="/Crud" element={<Crud />} />
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>

    </div>
  );
}

export default App;
