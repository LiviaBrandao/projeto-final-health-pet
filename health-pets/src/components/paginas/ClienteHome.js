import React, { Component } from 'react';
import axios from 'axios';
import './ClienteHome.css'
import Main from '../template/Main';
import { Link } from 'react-router-dom';
import DialogDadosCliente from '../paginas/DialogDadosCliente'
import { useCallback, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModal } from '../paginas/CustomModal';
import { number } from '../paginas/Servicos';
import DialogDadosMarcacao from './DialogDadosMarcacao';

const title = "Meus Agendamentos";

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

export default function ClienteHome() {

    var state = { ...initialState }

    //const [agendamento, lista, setAgendamento] = useState(state)
    const [agendamento, setAgendamento] = useState(state.agendamento);
    const [lista, setLista] = useState(state.lista);
    const [name, setName] = useState('John Doe');
    const [open, setOpen] = useState(false);


    // const componentDidMount = () => {
    //     console.log('Entrou no component')
    //     axios(urlAPI).then(resp => {
    //         setAgendamento({ lista: resp.data })
    //     })
    // }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // var valor = document.getElementById("inputEmail").value
        // setOpen(false);
        // alert("Você digitou: " + valor);
        setOpen(true);
    };

    const alertName = () => {
        alert(name);
    };

    const handleNameInput = e => {
        setAgendamento(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios(urlAPI).then(resp => {
                    setLista(resp.data)
                })

            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    const limpar = () => {
        setAgendamento({ agendamento: initialState.agendamento })
    }

    const salvar = () => {
        const dadosAgendamento = agendamento;

        const metodo = dadosAgendamento.idAgendamento ? 'put' : 'post';
        const url = dadosAgendamento.idAgendamento ? `${urlAPI}/${dadosAgendamento.idAgendamento}` : urlAPI;

        axios[metodo](urlAPI, dadosAgendamento)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                setAgendamento({ agendamento: initialState.agendamento, lista })
            })
    }

    // salvar() {
    //     const agendamento = agendamento;

    //     const metodo = agendamento.idAgendamento ? 'put' : 'post';
    //     const url = agendamento.idAgendamento ? `${urlAPI}/${agendamento.idAgendamento}` : urlAPI;

    //     axios[metodo](urlAPI, agendamento)
    //         .then(resp => {
    //             const lista = this.getListaAtualizada(resp.data)
    //             this.setState({ agendamento: initialState.aluno, lista })
    //         })
    // }

    // getListaAtualizada(agendamento, add = true) {
    //     const lista = this.state.lista.filter(a => a.idAgendamento !== agendamento.idAgendamento);
    //     if (add) lista.unshift(agendamento);
    //     return lista;
    // }

    // atualizaCampo(event) {
    //     //clonar usuário a partir do state, para não alterar o state diretamente
    //     const agendamento = { ...this.state.agendamento };
    //     //usar o atributo NAME do input para identificar o campo a ser atualizado
    //     agendamento[event.target.name] = event.target.value;
    //     //atualizar o state
    //     this.setState({ agendamento });
    // }

    // carregar(agendamento) {
    //     this.setState({ agendamento })
    // }

    // remover(agendamento) {
    //     const url = urlAPI + "/" + agendamento.idAgendamento;
    //     if (window.confirm("Confirma remoção do aluno: " + agendamento.dataAgendamento)) {
    //         console.log("entrou no confirm");
    //         axios['delete'](url, agendamento)
    //             .then(resp => {
    //                 const lista = this.getListaAtualizada(agendamento, false)
    //                 this.setState({ agendamento: initialState.agendamento, lista })
    //             })
    //     }
    // }

    // renderTable

    const dialogEstilo = {
        borderRadius: '90px',
        textAlign: 'center',
        margin: '1em auto auto',
        padding: '1em 0 2em 0'
    }
    const tituloEstilo = {
        color: '#f57251',
        fontWeight: 700,
        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif'"
    }

    const renderTable = () => {
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
                                    <DialogDadosMarcacao />
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
                            <th className="tabTituloRa"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {lista.map(
                            (agendamento) =>
                                <tr key={agendamento.idAgendamento}>
                                    <td>{agendamento.dataAgendamento}</td>
                                    <td>{agendamento.nomePet}</td>
                                    <td>{agendamento.nomeCuidador}</td>
                                    <td>{agendamento.nomeCliente}</td>
                                    <td>
                                        <button className= 'alteraAgendamentos btnClienteHome'onClick={() => this.carregar(agendamento)} >
                                            Altera
                                        </button>
                                        <button className='removeAgendamento btnClienteHome' onClick={() => this.remover(agendamento)} >
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

    return (
            <Main title={title}>
                {renderTable()}
            </Main>
    )

}