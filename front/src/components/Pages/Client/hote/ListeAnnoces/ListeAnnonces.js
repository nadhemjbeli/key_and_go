import React, {useEffect, useState} from 'react';
import NavigationBar from "../../pageVitrine/NavigationBar";
import Footer from "../../pageVitrine/Footer";
import TableAnnonce from "./TableAnnonce";
import axios from "axios";
import {BASE_URL} from "../../../../../config";
import {config} from "../../../../../AuthGuard";
import Cookies from 'js-cookie';

const ListAnnonces = () => {
    const [annonces, setAnnonces]=useState([])

    const fetchAnnoncesByHost = async () => {
        // console.log("Cookies.get('token')")
        // console.log(Cookies.get('k_g_token'))
        try {
            const response = await axios.get(`${BASE_URL}/api/annonce/by_host`, config);
            console.log('response')
            setAnnonces(response.data);
            console.log("response")
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    useEffect(() => {
        fetchAnnoncesByHost()
    }, []);
    return (
        <div>
            <div className="hote-list-annonces">
                <NavigationBar />
                <div className="container-fluid">
                    <TableAnnonce annonces={annonces} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ListAnnonces;