import React from 'react';
import { Routes, Route } from "react-router-dom";

import Main from './components/template/Main';
import CrudCliente from './components/CrudCliente/CrudCliente';
import CrudAgendamento from './components/CrudAgendamento/CrudAgendamento';
import CrudPet from './components/CrudPet/CrudPet';
import ClienteHome from './components/paginas/ClienteHome';
import Home from './components/template/Home';

export default function Rotas() {
    return (
        <Routes>
            <Route exact path='/'
                element= {
                    // <Main title="Bem Vindo!">
                    //     <div>Cadastro de alunos, cursos e carômetro</div>
                    // </Main>} 
                    <Home /> } />
            <Route path='/cliente' element= {<CrudCliente />} />
            <Route path='/agendamento' element={<CrudAgendamento />} />
            <Route path='/pet' element={<CrudPet />} />
            <Route path='/clienteHome' element={<ClienteHome />} />
            

            <Route path='*' element= {
                <Main title="Bem Vindo!">
                    <div>Página não encontrada</div>
                </Main>
            } />
        </Routes>
    )
}