import React, { useState, useEffect } from 'react';  
import { db } from '../../firebaseConection';
import { collection, deleteDoc, doc, onSnapshot, getDocs } from 'firebase/firestore'; 
import './listContact.css';
import { Link, useNavigate } from 'react-router-dom';

import Trash from '../../assets/delete.png';
import Pen from '../../assets/pencil.png';
import Home from '../../assets/home.png';
import { toast } from 'react-toastify';

// Função para buscar contatos, agora fora do componente
export async function searchContacts(setContatos) {
    const contactsRef = collection(db, "contatos");

    try {
        const snapshot = await getDocs(contactsRef);
        let lista = [];

        snapshot.forEach((doc) => {
            lista.push({
                id: doc.id,
                nome: doc.data().nome,
                idade: doc.data().idade,
                dtNasc: doc.data().dtNasc,
                email: doc.data().email,
                telefone: doc.data().telefone,
                endereco: doc.data().endereco,
                signo: doc.data().signo
            });
        });

        setContatos(lista);
    } catch (error) {
        console.log("ERRO AO BUSCAR", error);
    }
}

function ListContact() {
    const [contatos, setContatos] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const contactsRef = collection(db, "contatos");

        // onSnapshot para escutar mudanças em tempo real
        const unsub = onSnapshot(contactsRef, (snapshot) => {
            let lista = [];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    idade: doc.data().idade,
                    dtNasc: doc.data().dtNasc,
                    email: doc.data().email,
                    telefone: doc.data().telefone,
                    endereco: doc.data().endereco,
                    signo: doc.data().signo
                });
            });

            setContatos(lista);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    async function deleteContacts(id) {
        const contactsRef = doc(db, "contatos", id);

        try {
            await deleteDoc(contactsRef);
            toast.success("DELETADO COM SUCESSO!");
        } catch (error) {
            console.error("Erro ao deletar contato: ", error);
            toast.warn("ERRO AO DELETAR CONTATO!");
        }
    }

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando Contatos...</h2>
            </div>
        )
    }

    return (
        <div className='content-container'>
            <Link to='/'>
                <div className="fixed-container">
                    <img className="fixed-image" src={Home} alt="Imagem home" />
                    <span className="fixed-text">Retornar a Home</span>
                </div>
            </Link>
            <div className="table-container">
                <table className="dateTable">
                    <thead className='header'>
                        <tr>
                            <th className='headerIten'>Nome</th>
                            <th className='headerIten'>Idade</th>
                            <th className='headerIten'>Data de Nascimento</th>
                            <th className='headerIten'>Email</th>
                            <th className='headerIten'>Telefone</th>
                            <th className='headerIten'>Endereço</th>
                            <th className='headerIten'>Signo</th>
                            <th className='headerIten'>Excluir</th>
                            <th className='headerIten'>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contatos.map((contato) => (
                            <tr key={contato.id} className='infoDate'>
                                <td className='headerDate'>{contato.nome}</td>
                                <td className='headerDate'>{contato.idade}</td>
                                <td className='headerDate'>{contato.dtNasc}</td>
                                <td className='headerDate'>{contato.email}</td>
                                <td className='headerDate'>{contato.telefone}</td>
                                <td className='headerDate'>{contato.endereco}</td>
                                <td className='headerDate'>{contato.signo}</td>
                                <td className='headerDate'>
                                    <img onClick={() => deleteContacts(contato.id)} id='trashImg' src={Trash} alt="Imagem deletar" />
                                </td>
                                <td className='headerDate'>
                                    <img onClick={() => navigate(`/editContact/${contato.id}`)}  id='pencilImg' src={Pen} alt="Imagem editar" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListContact;
