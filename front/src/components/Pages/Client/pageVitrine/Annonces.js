import React from 'react';
import img_01 from "../../../img/img-01.jpg"
import img_02 from "../../../img/img-02.jpg"
import img_03 from "../../../img/img-03.jpg"
import img_04 from "../../../img/img-04.jpg"
import img_05 from "../../../img/img-05.jpg"
import {BASE_URL} from "../../../../config";
import {Link} from "react-router-dom";

// const annonces = [
//     {image:img_01, alt:"img_01"},
//     {image:img_02, alt:"img_02"},
//     {image:img_03, alt:"img_03"},
//     {image:img_04, alt:"img_04"},
//     {image:img_05, alt:"img_05"},
// ]
function Annonces(props) {
    const {annonces, difference} = props
    // console.log(difference)
    return (
        <div className="annonces evennements">
            {annonces && annonces.map((annonce, index)=>(
                <div className="annonce"  key={index}>
                    <div className="img">
                        <Link to={"/annonce/"+annonce._id+"/"+difference}>
                            <img src={`${BASE_URL}/uploads/${annonce.photos[0]}`} alt={annonce.title} className="" />
                        </Link>
                    </div>
                    <h5 className="location" style={{marginBottom:"1rem"}}>{annonce.adresse && annonce.adresse.pays+", "+annonce.adresse.ville}</h5>
                    <p className="price"><strong>{annonce.prix && "€ "+annonce.prix}</strong> par nuit</p>
                    {
                        difference && difference !== 0 &&
                        <p className="total">
                            <strong>{annonce.prix && "€ "+annonce.prix}</strong> * {difference>1?difference+" jours":difference+" jour"} = € {annonce.prix * difference}
                        </p>
                    }
                </div>
            ))}
        </div>
    );
}

export default Annonces;