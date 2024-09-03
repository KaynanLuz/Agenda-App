import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home/home';
import ScreenCreationContact from './pages/ContactCreation/contactCreation';
import ListContact from './pages/ListContact/listContact';
import Erro from "./pages/Erro/erro";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/listContact" element={<ListContact />} />
                <Route path="/editContact/:contactId" element={<ScreenCreationContact />} />
                <Route path="/" element={<Home />} /> 

                <Route path="*" element={ <Erro/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;