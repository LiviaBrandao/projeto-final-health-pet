import './Menu.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu(props) {
    return (
        <nav className='menu'>
            <a href="#/">
                Agendamentos
            </a>
            <a href="#/">
                Quem Somos
            </a>
            <a href="#/">
                Serviços
            </a>
            <button className='botaoLogin botaoOutlined'>
                Log In
            </button>
        </nav>
    )
}