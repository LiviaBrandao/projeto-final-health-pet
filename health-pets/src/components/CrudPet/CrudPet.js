import React, { Component } from 'react';
import axios from 'axios';
import './CrudPet.css';
import Main from '../template/Main';
import { Link } from 'react-router-dom';

const title = "Meus Pets";

const urlAPI = "http://localhost:5001/api/pet";
const initialState = {
    pet: { codPet: 0, nomePet: '', raca: '', tipoPet: '', codCliente: '' },
    lista: []
}

export default class CrudPet extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    limpar() {
        this.setState({ pet: initialState.pet });
    }

    salvar() {
        const pet = this.state.pet;

        const metodo = pet.codPet ? 'put' : 'post';
        const url = pet.codPet ? `${urlAPI}/${pet.codPet}` : urlAPI;

        axios[metodo](urlAPI, pet)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ pet: initialState.aluno, lista })
            })
    }

    getListaAtualizada(pet, add = true) {
        const lista = this.state.lista.filter(a => a.codPet !== pet.codPet);
        if (add) lista.unshift(pet);
        return lista;
    }

    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const pet = { ...this.state.pet };
        //usar o atributo NAME do input para identificar o campo a ser atualizado
        pet[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ pet });
    }

    carregar(pet) {
        this.setState({ pet })
    }

    remover(pet) {
        const url = urlAPI + "/" + pet.codPet;
        if (window.confirm("Confirma remoção do aluno: " + pet.nomePet)) {
            console.log("entrou no confirm");
            axios['delete'](url, pet)
                .then(resp => {
                    const lista = this.getListaAtualizada(pet, false)
                    this.setState({ pet: initialState.pet, lista })
                })
        }
    }

    renderForm() {
        return (
            <div className="alteracaoContainer">
                <button className='btnCadastrar'>
                    Cadastrar Novo Pet
                </button>
                <Link to="/clienteHome">
                <button className="btnCancelarAcao"
                    onClick={e => this.limpar(e)} >
                    Agendamentos
                </button>
                </Link>
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
                            <th className="tabTituloNome">Raça</th>
                            <th className="tabTituloCurso">Tipo</th>
                            <th className="tabTituloCurso"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (pet) =>
                                <tr key={pet.codPet}>
                                    <td>{pet.nomePet}</td>
                                    <td>{pet.raca}</td>
                                    <td>{pet.tipoPet}</td> 
                                    <td>
                                        <button className = "btnAlterarAlign btnTextStyle" onClick={() => this.carregar(pet)} >
                                            Alterar
                                        </button>
                                        <button className="btnRemoverAlign btnTextStyle" onClick={() => this.remover(pet)} >
                                            Remover
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
                {this.renderTable()}
                {this.renderForm()}
            </Main>
        )
    }
}