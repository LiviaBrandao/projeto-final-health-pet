import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import './CrudPet.css';
import Main from '../template/Main';

const title = "Cadastro de Alunos";

const urlAPI = "http://localhost:5001/api/pet";
const initialState = {
    pet: { codPet: 0, nomePet: '', raca: '', tipoPet: '' },
    lista: []
}

export default function CrudPet() {

    var state = { ...initialState }

    const [pet, setPet] = useState(state.pet);
    const [lista, setLista] = useState(state.lista);


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
        setPet({ pet: initialState.pet })
    }

    const salvar = () => {
        const dadosPet = pet;

        const metodo = dadosPet.codPet ? 'put' : 'post';

        axios[metodo](urlAPI, dadosPet)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                setPet({ pet: initialState.dadosPet, lista })
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

    return (
        <Main title={title}>
            {renderTable()}
        </Main>
    )

}