import { useState, useEffect } from 'react';
import './contactCreation.css';
import user from '../../assets/user.png';
import home from '../../assets/home.png';
import { db } from '../../firebaseConection';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { capitalizedWords, maskAge, maskDateBirth, maskPhone, validateForm } from '../../utils';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

function ContactForm() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [dtNasc, setDtNasc] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [signo, setSigno] = useState('');
    const [id, setId] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(true); // Mantém os campos bloqueados por padrão
    const [isEditing, setIsEditing] = useState(false);  // Controle de estado para modo de edição

    const { contactId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (contactId) {
            async function fetchContact() {
                const contactRef = doc(db, "contatos", contactId);
                const contactSnap = await getDoc(contactRef);
                if (contactSnap.exists()) {
                    const data = contactSnap.data();
                    setNome(data.nome);
                    setIdade(data.idade);
                    setDtNasc(data.dtNasc);
                    setEmail(data.email);
                    setTelefone(data.telefone);
                    setEndereco(data.endereco);
                    setSigno(data.signo);
                    setId(contactId);
                    setIsReadOnly(true);  // Campos começam bloqueados
                    setIsEditing(false);   // Não está no modo de edição inicialmente
                }
            }
            fetchContact();
        } else {
            setIsReadOnly(false);  // Permite edição se estiver criando um novo contato
            setIsEditing(true);    // Está no modo de edição para um novo contato
        }
    }, [contactId]);

    async function handleSubmit() {
        if (!validateForm({ nome, idade, telefone })) {
            return;
        }

        if (id) {
            const contactRef = doc(db, "contatos", id);
            await updateDoc(contactRef, {
                nome, idade, dtNasc, email, telefone, endereco, signo
            });
            toast.success("Contato atualizado com sucesso!");
        } else {
            await addDoc(collection(db, "contatos"), {
                nome, idade, dtNasc, email, telefone, endereco, signo
            });
            toast.success("Contato adicionado com sucesso!");
        }

        setNome('');
        setIdade('');
        setDtNasc('');
        setEmail('');
        setTelefone('');
        setEndereco('');
        setSigno('');
        navigate('/listContact');
    }

    function handleEditToggle() {
        if (isEditing) {
            handleSubmit();
        } else {
            setIsReadOnly(false); // Desbloqueia os campos para edição
            setIsEditing(true);   // Alterna para o modo de edição
        }
    }

    return (
        <div className="app">
            {!contactId && (
                <a href='#home' id="ancorLine">
                    <div className="container-home">
                        <img id="imgHome" src={home} alt="Ícone em forma de casa" />
                        <h4 className="title-container">Retornar para Home</h4>
                    </div>
                </a>
            )}
            <div className="container">
                <div className="containerDados">
                    <label className="labelProp">Nome </label>
                    <input className="inputProp" type="text" placeholder="Informe o nome do contato" value={nome} onChange={(e) => setNome(e.target.value)} maxLength={25} readOnly={isReadOnly} onInput={capitalizedWords} />
                    <label className="labelProp">Idade </label>
                    <input className="inputProp" type="text" placeholder="Informe a idade do contato" value={idade} maxLength={2} onChange={(e) => setIdade(e.target.value)} readOnly={isReadOnly} onInput={maskAge} />
                    <label className="labelProp">Data de Nascimento </label>
                    <input className="inputProp" type="text" placeholder="Informe a data de nascimento do contato" value={dtNasc} maxLength={10} onChange={(e) => setDtNasc(e.target.value)} readOnly={isReadOnly} onInput={maskDateBirth}/>
                    <label className="labelProp">E-mail </label>
                    <input className="inputProp" type="text" placeholder="Informe o e-mail do contato" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={30} readOnly={isReadOnly} />
                    <label className="labelProp">Telefone </label>
                    <input className="inputProp" type="text" placeholder="Informe o número do contato" value={telefone} maxLength={15} onChange={(e) => setTelefone(e.target.value)} readOnly={isReadOnly} onInput={maskPhone} />
                    <label className="labelProp">Endereço </label>
                    <input className="inputProp" type="text" placeholder="Informe o endereço do contato" value={endereco} onChange={(e) => setEndereco(e.target.value)} maxLength={35} readOnly={isReadOnly} onInput={capitalizedWords} />
                    <div className="groupSignos">
                        <label className="labelProp">Signo </label>
                        <select className="selectProp" id="signo" name="signo" value={signo} onChange={(e) => setSigno(e.target.value)} disabled={isReadOnly}>
                            <option value="">Selecione o signo do contato</option>
                            <option value="Aries">Áries</option>
                            <option value="Touro">Touro</option>
                            <option value="Gemeos">Gêmeos</option>
                            <option value="Cancer">Câncer</option>
                            <option value="Leao">Leão</option>
                            <option value="Virgem">Virgem</option>
                            <option value="Libra">Libra</option>
                            <option value="Escorpiao">Escorpião</option>
                            <option value="Sagitario">Sagitário</option>
                            <option value="Capricornio">Capricórnio</option>
                            <option value="Aquario">Aquário</option>
                            <option value="Peixes">Peixes</option>
                        </select>
                    </div>
                </div>
                <div className="containerImg">
                    <img id="imageContact" src={user} alt="Ícone usuário" />
                    <Link to='/listContact'>
                        <button id="btnSearch">Contatos</button>
                    </Link>
                    <button id="btnAdd" onClick={handleEditToggle}>
                        {id ? (isEditing ? 'Atualizar' : 'Editar') : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;



