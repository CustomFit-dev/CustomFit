import './css/index.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Store from './components/Store';
// import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="/Store" element={<Store/>}/>
        {/* <Route path="/Form" element={<Form/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
