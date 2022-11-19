import { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './Dialog.css';


const urlAPI = "http://localhost:5001/api/agendamento";
const valorImg = [1, 2, 3, 4, 5, 6, 7, 8];

const initialState = {
    agendamento: { idAgendamento: 0, dataAgendamento: '', nomePet: '', nomeCuidador: '', nomeCliente: '' },
    lista: []
}

const DialogDadosMarcacao = () => {

    var state = { ...initialState }

    const [open, setOpen] = useState(false);

    const [agendamento, setAgendamento] = useState(state.cliente);
    const [lista, setLista] = useState(state.lista);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             axios(urlAPI).then(resp => {
    //                 setLista(resp.data)
    //             })

    //         } catch (error) {
    //             console.error(error.message);
    //         }
    //     }

    //     fetchData();
    // }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const atualizaDados = (event) => {
        const agendamentoAtualizado = { ...state.agendamento };
        agendamentoAtualizado[event.target.name] = event.target.value;
    }

    const getListaAtualizada = (agendamento, add = true) => {
        const listaAtualizada = lista.filter(ag => ag.idAgendamento !== agendamento.idAgendamento);
        if (add) listaAtualizada.unshift(agendamento);
        return listaAtualizada;
    }

    const salvarDados = () => {
        const novoAgendamento = { ...state.cliente };
        novoAgendamento.dataAgendamento = document.getElementById("dataMarcacao").value;
        novoAgendamento.nomePet = document.getElementById("pet").value;
        novoAgendamento.nomeCuidador = document.getElementById("cuidador").value;
        novoAgendamento.nomeCliente = document.getElementById("nomeCliente").value;

        const metodo = 'post';
        
        //console.log('\n\n Valor input: ' + nomeCliente + '\n\n' + cpfCliente);

        // console.log('\n\n Adicionando dados: ' + novoAgendamento.codCliente);
        // console.log('Adicionando dados: ' + novoAgendamento.cpfCliente);

        try {
            axios[metodo](urlAPI, novoAgendamento)
            .then(resp => {
                const listaAtualizada = getListaAtualizada(resp.data)
                setLista(listaAtualizada)
            })

        } catch (err) {
            console.err(err.message);
        }
    };


    // const state = () => {
    //     axios(urlAPI).then(resp => {
    //         this.setState({ lista: resp.data })
    //     })
    // }

    return (
        <div>
            <button className='btnTextAlign btnText' onClick={handleClickOpen}>
                Agendar
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="dataMarcacao"
                        label="Data"
                        type="text"
                        fullWidth
                        name='dataAgendamento'
                        variant="standard"
                        onChange={e => atualizaDados(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="pet"
                        label="Nome do Pet"
                        type="text"
                        fullWidth
                        name='nomePet'
                        variant="standard"
                        onChange={e => atualizaDados(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cuidador"
                        label="Nome do Cuidador"
                        type="text"
                        fullWidth
                        name='nomeCuidador'
                        variant="standard"
                        onChange={e => atualizaDados(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nomeCliente"
                        label="Dono"
                        type="text"
                        fullWidth
                        name='nomeCliente'
                        variant="standard"
                        onChange={e => atualizaDados(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <button className='btnTextAlign btnText' onClick={salvarDados}>
                        Marcar
                    </button>
                    <button className='btnTextAlign btnText' onClick={handleClose}>
                        Cancelar
                    </button>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Alterar Dados</Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogDadosMarcacao;