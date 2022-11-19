import './Menu.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu(props) {
    return (
        <nav className='menu'>
            <Link to="/clienteHome">
                Agendamentos
            </Link>
            <Link to="/profissionais">
                Nossos Profisionais
            </Link>
            <Link to="/nos">
                Servicos
            </Link>
        </nav>
    )
}