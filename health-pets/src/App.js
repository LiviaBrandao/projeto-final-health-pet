import './App.css';

import Logo from './components/template/Logo';
import Menu from './components/template/Menu';
import Footer from './components/template/Footer';
import Rotas from './Rotas';
import { useModal } from './components/paginas/CustomModal';

import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Menu />
        <Rotas/>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
