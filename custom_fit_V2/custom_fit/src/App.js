import './css/index.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';
import Form from './components/modules/Registrar';
import Crud from './components/modules/Crud';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Store" element={<Store/>}/>
        <Route path="/Form" element={<Form/>}/>
        <Route path="/Crud" element={<Crud/>}/>
      </Routes>
    </div>
  );
}

export default App;
