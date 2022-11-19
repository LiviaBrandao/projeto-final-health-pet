import React, { Component } from 'react';
import axios from 'axios';
import './CrudCliente.css'
import Main from '../template/Main';

const title = "Cadastro de Alunos";

const urlAPI = "http://localhost:5001/api/cliente";
const initialState = {
    cliente: { codCliente: 0, nomeCliente: '', cpfCliente: '', nomePet: ''},
    lista: []
}

export default class CrudCliente extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    limpar() {
        this.setState({ cliente: initialState.cliente });
    }

    salvar() {
        const cliente = this.state.cliente;

        const metodo = cliente.codCliente ? 'put' : 'post';
        const url = cliente.codCliente ? `${urlAPI}/${cliente.codCliente}` : urlAPI;

        axios[metodo](urlAPI, cliente)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ cliente: initialState.aluno, lista })
            })
    }

    getListaAtualizada(cliente, add = true) {
        const lista = this.state.lista.filter(a => a.codCliente !== cliente.codCliente);
        if (add) lista.unshift(cliente);
        return lista;
    }

    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const cliente = { ...this.state.cliente };
        //usar o atributo NAME do input para identificar o campo a ser atualizado
        cliente[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ cliente });
    }

    carregar(cliente) {
        this.setState({ cliente })
    }

    remover(cliente) {
        const url = urlAPI + "/" + cliente.codCliente;
        if (window.confirm("Confirma remoção do aluno: " + cliente.nomeCliente)) {
            console.log("entrou no confirm");
            axios['delete'](url, cliente)
                .then(resp => {
                    const lista = this.getListaAtualizada(cliente, false)
                    this.setState({ cliente: initialState.cliente, lista })
                })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Nome </label>
                <input
                    type="text"
                    id="ra"
                    placeholder="RA do aluno"
                    className="form-input"
                    name="ra"

                    value={this.state.cliente.nomeCliente}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> CPF: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome do aluno"
                    className="form-input"
                    name="nome"

                    value={this.state.cliente.cpfCliente}

                    onChange={e => this.atualizaCampo(e)}
                />
                {/* <label> Nome Pet: </label>
                <input
                    type="number"
                    id="codCurso"
                    placeholder="0"
                    className="form-input"
                    name="codCurso"

                    value={this.state.cliente.codCliente}
                    onChange={e => this.atualizaCampo(e)}
                /> */}
                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Nome</th>
                            <th className="tabTituloNome">Cpf</th>
                            <th className="tabTituloCurso">Pet</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (cliente) =>
                                <tr key={cliente.codCliente}>
                                    <td>{cliente.nomeCliente}</td>
                                    <td>{cliente.cpfCliente}</td>
                                    <td>{cliente.nomePet}</td>
                                    <td>
                                        <button onClick={() => this.carregar(cliente)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(cliente)} >
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
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}