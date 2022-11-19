import './Home.css'

import Logo from './Logo';
import Menu from './Menu';
import Main from './Main';
import Footer from './Footer';

import pet from '../../assets/images/pet-2.png'
import BasicCard from './BasicCard';
import MediaCard from './MediaCard';
import Gallery from './Gallery'

const title = 'Cadastre de Pets';
function Home() {
    // const divStyle = {
    //   background- color: 'rgb(66, 66, 66)'
    // };

    return (
        <div>
            <div>
                <div className='bodyComponents'>
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
            </div>
        </div>
    );
}

const render = ()=> {
    return (
        <Main title={title}>
            {console.log('Entrou no component')}
            {this.renderTable()}
        </Main>
    )
}

export default Home;