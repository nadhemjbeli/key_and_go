import React, {useContext, useState} from 'react';
import logo from "../../../img/logo png 2.png"
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";
import axios from "axios";
import {BASE_URL} from "../../../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
const NavigationBar = () => {
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    // isLoggedIn is a boolean flag to determine user authentication status
    const navigate = useNavigate();


    const handleLogoutClick = () => {
        setShowLogoutAlert(true);
    };

    const handleLogout = async () => {
        // Handle logout logic here
        // console.log(localStorage.getItem("token"))
        // console.log(isLoggedIn())
        await axios.get(BASE_URL+"/logout").then(resp =>{
            setLoggedIn(false)
            navigate("/login")
            // window.location="/login"
        })
    };
    return (
        <>
            <nav className={`navbar-container`}>
                <div className="animated-content">
                    <nav className="navbar navbar-expand-lg navbar-light ">
                        <div className="container">
                            <Link className="navbar-brand" to="/main">
                                <img src={logo} height="40" className="d-inline-block align-top" alt="Logo"/>
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                    {/*<li className="nav-item">*/}
                                    {/*    <a className="nav-link" href="#">Account</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                    {/*    <a className="nav-link" href="#">Contact Us</a>*/}
                                    {/*</li>*/}
                                    {loggedIn ? (
                                            <li className="nav-item dropdown">
                                                {/*<a className="nav-link" href="#">Blog</a>*/}
                                                <a className="nav-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                                    <Link className="dropdown-item" to="#" onClick={handleLogoutClick}>
                                                        Logout <FontAwesomeIcon icon={faSignOutAlt} style={{ marginLeft: '5px' }} />
                                                    </Link>
                                                </div>

                                            </li>):
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/register">
                                                    Registrer
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">
                                                    Se Connecter
                                                </Link>
                                            </li>
                                        </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </nav>
            <div>
                {showLogoutAlert && (

                    <SweetAlert
                        title="Êtes-vous sûr de vouloir vous déconnecter?"
                        type="warning"
                        style={{backgroundColor:"#eae3da"}}
                        showCancelButton
                        cancelBtnBsStyle="secondary"
                        confirmBtnBsStyle="danger"
                        cancelBtnText="Cancel"
                        confirmBtnText="Déconnexion"
                        onConfirm={handleLogout}
                        onCancel={() => setShowLogoutAlert(false)}
                        focusCancelBtn
                    />
                )}
            </div>
        </>


    )
}
export default NavigationBar;