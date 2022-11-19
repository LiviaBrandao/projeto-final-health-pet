import React, { Component } from 'react';
import axios from 'axios';
import './CrudAgendamento.css'
import Main from '../template/Main';
import { Link } from 'react-router-dom';
import DialogDadosCliente from '../paginas/DialogDadosCliente'
import { useCallback, useEffect, useState } from 'react'
import { useModal } from '../paginas/CustomModal';
import { number } from '../paginas/Servicos';

const title = "Cadastro de Alunos";

const urlAPI = "http://localhost:5001/api/agendamento";
const imgUrl = 'https://raw.githubusercontent.com/LiviaBrandao/projeto-escola-ds402/main/assets/';
const valorImg = [1, 2, 3, 4, 5, 6, 7, 8];

const initialState = {
    agendamento: { idAgendamento: 0, dataAgendamento: '', nomePet: '', nomeCuidador: '', nomeCliente: '' },
    lista: []
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class CrudAgendamento extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    limpar() {
        this.setState({ agendamento: initialState.agendamento });
    }

    salvar() {
        const agendamento = this.state.agendamento;

        const metodo = agendamento.idAgendamento ? 'put' : 'post';
        const url = agendamento.idAgendamento ? `${urlAPI}/${agendamento.idAgendamento}` : urlAPI;

        axios[metodo](urlAPI, agendamento)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ agendamento: initialState.aluno, lista })
            })
    }

    getListaAtualizada(agendamento, add = true) {
        const lista = this.state.lista.filter(a => a.idAgendamento !== agendamento.idAgendamento);
        if (add) lista.unshift(agendamento);
        return lista;
    }

    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const agendamento = { ...this.state.agendamento };
        //usar o atributo NAME do input para identificar o campo a ser atualizado
        agendamento[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ agendamento });
    }

    carregar(agendamento) {
        this.setState({ agendamento })
    }

    remover(agendamento) {
        const url = urlAPI + "/" + agendamento.idAgendamento;
        if (window.confirm("Confirma remoção do aluno: " + agendamento.dataAgendamento)) {
            console.log("entrou no confirm");
            axios['delete'](url, agendamento)
                .then(resp => {
                    const lista = this.getListaAtualizada(agendamento, false)
                    this.setState({ agendamento: initialState.agendamento, lista })
                })
        }
    }

    renderTable() {
        console.log({ number })
        return (
            <div className="listagem">
                <div className='profileCliente'>
                    <table>
                        <tbody>
                            <tr className='cardAlign'>
                                <td className='imagePhoto'>
                                    <img src={`${imgUrl}00${valorImg[getRandomInt(1, 8)]}.png`}
                                        alt="alo" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <DialogDadosCliente />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to="/pet">
                                        <button className='btnTextAlign btnText'>
                                            Meus Pets
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                        <button className='btnTextAlign btnText' onClick={this.abrirModal}>
                                            Meus Pets
                                        </button>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Data</th>
                            <th className="tabTituloNome">Tipo</th>
                            <th className="tabTituloCurso">Pet</th>
                            <th className="tabTituloRa">Funcionário</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (agendamento) =>    
                                <tr key={agendamento.idAgendamento}>
                                    <td>{agendamento.dataAgendamento}</td>
                                    <td>{agendamento.nomePet}</td>
                                    <td>{agendamento.nomeCuidador}</td>
                                    <td>{agendamento.nomeCliente}</td>
                                    <td>
                                        <button onClick={() => this.carregar(agendamento)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(agendamento)} >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {console.log('Entrou no component')}
                {this.renderTable()}
            </Main>
        )
    }
}