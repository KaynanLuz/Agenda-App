import React from 'react';
import CreateContact from '../ContactCreation/contactCreation';
import './home.css';

function Home() {

    return (
        <section id="home" className="screenMain">
            <div className="home-content">
                <h1 class="titleHome">Olá, <br />Seja bem-vindo</h1>
                <p className="paragraphHome">Adicione seus contatos, e suas respectivas informações variadas!</p>
                <a href="#newContact">
                    <button className="buttonAction">
                        Clique Aqui para cadastrar 👇
                    </button>
                </a>
            </div>
            <div id="newContact" className="contact-section">
                <CreateContact />
            </div>
        </section>
    );
}

export default Home;

