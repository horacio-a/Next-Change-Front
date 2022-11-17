import './App.css';
import IndexPage from './pages/index';
import ConversionPage from './pages/Conversion';
import MultiConversionPage from './pages/MultiConversion';
import ContactoPage from './pages/contacto';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/MultiConversion' element={<MultiConversionPage />} />
        <Route path='/convertir' element={<ConversionPage />} />
        <Route path='/contacto' element={<ContactoPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
