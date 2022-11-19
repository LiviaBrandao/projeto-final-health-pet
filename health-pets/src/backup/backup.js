import './App.css';

import Logo from './components/template/Logo';
import Menu from './components/template/Menu';
import Main from './components/template/Main';
import Footer from './components/template/Footer';

import pet from './assets/images/pet-2.png'
import BasicCard from './components/template/BasicCard';
import MediaCard from './components/template/MediaCard';
import Gallery from './components/template/Gallery'

function App() {
    // const divStyle = {
    //   background- color: 'rgb(66, 66, 66)'
    // };

    return (
        <div>
            <div>
                <div className='barraNavegacao' >
                    <div className='logoDivisao'>
                        <Logo />
                    </div>
                    <div className='elementos'>
                        <div className='asideElementos'>
                            <Menu />
                            <div>
                                <img src={pet} className='pet-logo' alt="pet-logo" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bodyComponents'>
                    <Main />
                    <div className='cardComponent'>
                        A clínica Health Pets cuida do
                        <br />seu pet com amor e carinho!
                        <a className='subtexto'>
                            <br />Temos profissionais preparados para lidar com uma grande variedade de pets:
                        </a>
                        <Gallery />
                        <div className='cardContainer'>
                            <div>
                                <BasicCard />
                                <MediaCard />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
