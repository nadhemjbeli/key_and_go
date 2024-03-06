import React, { useState } from 'react';
import {BASE_URL} from "../../../../../config";
import SweetAlert from "react-bootstrap-sweetalert";
import DetailsAnnonce from "./DetailsAnnonce";
import showDetailsModal from "./DetailsAnnonce";

const TableAnnonce = ({ annonces }) => {
    const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

    const toggleDetails = (index) => {
        // setExpandedAnnouncement(index);
    };

    const handleClick = (index) => {
        showDetailsModal(annonces, index);
    };


    return (
        <table className="table" id="table_detail_annonces">
            <thead>
            <tr>
                <th>Titre</th>
                <th>Prix</th>
                <th>Valabilité</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {annonces.map((annonce, index) => (
                <tr key={index}>
                    <td>{annonce.titre}</td>
                    <td>{annonce.prix}</td>
                    <td>{annonce.valable ? 'Oui' : 'Non'}</td>
                    <td>
                        <button className="btn btn-info" onClick={()=>{handleClick(index)}}>Details</button>
                    </td>
                </tr>
            ))}
            </tbody>

        </table>
    );
};

export default TableAnnonce;