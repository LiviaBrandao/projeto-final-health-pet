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


const urlAPI = "http://localhost:5001/api/cliente";
const valorImg = [1, 2, 3, 4, 5, 6, 7, 8];

const initialState = {
    cliente: { codCliente: 0, nomeCliente: '', cpfCliente: '' },
    lista: []
}

const FormDialog = () => {

    var state = { ...initialState }

    const [open, setOpen] = useState(false);

    const [cliente, setCliente] = useState(state.cliente);
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
        const clienteAtualizado = { ...state.cliente };
        clienteAtualizado[event.target.name] = event.target.value;
        setCliente({ cliente: clienteAtualizado });
        console.log('\n\nNome do Cliente' + clienteAtualizado.nomeCliente);
        console.log('\n\nNome do Cliente' + clienteAtualizado.cpfCliente);
    }

    const procuraCliente = (nomeCliente, cpfCliente) => {
        // const modelo = lista.filter(cli => cli.nomeCliente !== nomeCliente && cli.cpfCliente !== cpfCliente)
        const codCliente = 0;
        console.log('Nome do Cliente' + nomeCliente);
        console.log('Cpf do Cliente' + cpfCliente);
        console.log('Cliente cod cliente' + cliente.codCliente);
        lista.forEach(cliente => {
            console.log('Cliente' + cliente.nomeCliente)
            console.log('Cliente' + cliente.cpfCliente)
            console.log('Cliente' + cliente.codCliente)
            
            if(cliente.nomeCliente == nomeCliente && cliente.cpfCliente == cpfCliente) {
                console.log('Dados do cliente' + cliente.codCliente)
                return codCliente = cliente.codCliente
            }
        });
        console.log('Codigo do Cliente' + codCliente)
        return codCliente
    }

    const getListaAtualizada = (cliente, add = true) => {
        const listaAtualizada = lista.filter(cli => cli.codCliente !== cliente.codCliente);
        if (add) listaAtualizada.unshift(cliente);
        return listaAtualizada;
    }

    const salvarDados = () => {
        const novoCliente = { ...state.cliente };
        novoCliente.nomeCliente = document.getElementById("name").value;
        novoCliente.cpfCliente = document.getElementById("cpf").value;
        novoCliente.codCliente = procuraCliente(novoCliente.nomeCliente, novoCliente.cpfCliente);

        const metodo = cliente.codCliente ? 'put' : 'post';
        const url = cliente.codCliente ? `${urlAPI}/${novoCliente.codCliente}`: urlAPI;
        
        //console.log('\n\n Valor input: ' + nomeCliente + '\n\n' + cpfCliente);

        console.log('\n\n Adicionando dados: ' + novoCliente.codCliente);
        console.log('Adicionando dados: ' + novoCliente.cpfCliente);

        try {
            axios[metodo](url, novoCliente)
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
                Alterar Dados
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Alteração de Dados</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome de Usuário"
                        type="email"
                        fullWidth
                        name='nomeCliente'
                        variant="standard"
                        onChange={e => atualizaDados(e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cpf"
                        label="CPF"
                        type="email"
                        fullWidth
                        name='cpfCliente'
                        variant="standard"
                        onChange={e => atualizaDados(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <button className='btnTextAlign btnText' onClick={salvarDados}>
                        Alterar
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

export default FormDialog;