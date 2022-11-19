import './Header.css';

export default function Header(props) {
    return (
        <header className="header">
            <div className='cabecalho'>
                {props.title}
            </div>
        </header>
    )
}