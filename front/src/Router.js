import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/User/RegistrationForm";
import LoginForm from "./components/User/LoginForm";
import Home from "./components/Pages/Client/Home";
import UserList from "./components/Pages/Admin/UserList";
import AddUserForm from "./components/Pages/Admin/AddUserForm";
import StripedPayment from "./components/Pages/Client/StripedPayment";
import ConsultationKeys from "./components/Pages/Client/ConsultationKeys";
import KeyComments from "./components/Pages/Client/VehicleKey/KeyComments";
import AuthContext from "./context/AuthContext";
import Main from "./components/Pages/Client/pageVitrine/Main";
import AnnonceDetails from "./components/Pages/Client/pageVitrine/AnnonceDetails/Annonce-details";
import ListeAnnonces from "./components/Pages/Client/hote/ListeAnnoces/ListeAnnonces";
import AnnoncesParEvennement from "./components/Pages/Client/pageVitrine/Evennement/AnnoncesParEvennement";

function Router() {
    const { loggedIn } = useContext(AuthContext);
    console.log(loggedIn)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Main />}/>
                <Route path="/main" exact element={<Main />}/>
                <Route path="/host" exact element={<ListeAnnonces />}/>
                <Route path="/annonce/:id/:diff" exact element={<AnnonceDetails />}/>
                <Route path="/event/:id" exact element={<AnnoncesParEvennement />}/>
                <Route path="/vehicle-key-comments/:vehicleKeyId" element={<KeyComments />}/>

                <Route path="/pay" exact element={<StripedPayment />}/>
                <Route path="/adminUser" exact element={<UserList />}/>
                <Route path="/adminUser/add" exact element={<AddUserForm />}/>
                {/*{loggedIn === false && (*/}
                    <>
                        <Route path="/register" exact element={<RegistrationForm />}/>
                        <Route path="/login" exact element={!loggedIn? < LoginForm />:"page not found"}/>
                    </>
                    {/*)}*/}
            </Routes>
        </BrowserRouter>
    );

}

export default Router;