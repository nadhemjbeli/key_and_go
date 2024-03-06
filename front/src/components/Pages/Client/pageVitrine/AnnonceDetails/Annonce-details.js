import React, {useEffect, useState} from 'react';
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import {useParams} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../../../config";
import Description from "./Description";
import SlidingPage from "./SlidingPage";

const AnnonceDetails = (props) => {
    const [annonce, setAnnonce]=useState({});
    const [photos, setPhotos]=useState([""]);
    const [firstPhoto, setFirstPhoto]=useState("");
    const [firstFivePhotos, setFirstFivePhotos]=useState([""]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id, diff } = useParams();
    const showAnnonce = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/annonce/${id}`);
            setAnnonce(response.data);
            console.log(response.data)
            const images = response.data.photos;
            setPhotos(images);

            if (images.length > 1) {
                setFirstPhoto(images[0]);

                let firstFive = images.slice(1, 5);
                if (images.length < 5) {
                    firstFive = [...firstFive, ...Array(5 - images.length).fill("")];
                }
                setFirstFivePhotos(firstFive);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    useEffect(() => {
        showAnnonce(id)
    }, []);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div className="annonce-details">
            <NavigationBar/>
            <div className="content">
                <div className="empty"></div>
                <div className="kg-content">
                    <div className="all-annonce">
                        <div className="header">
                            <h2>{annonce.titre}</h2>
                        </div>
                        <div className="annonces">
                            <div className="part1">
                                <img className="first-photo" src={`${BASE_URL}/uploads/${firstPhoto}`} alt=""/>
                            </div>
                            <div className="part2">
                                {firstFivePhotos && firstFivePhotos.map((photo, index)=>(
                                    <div className="annonce"  key={index}>
                                        {
                                            photo!=="" && <img className="small-photos" src={`${BASE_URL}/uploads/${photo}`} alt=""/>
                                        }
                                    </div>
                                ))}
                                <div className="more">
                                    <button className="check-other-images btn btn-light tm-color-primary tm-bg-beige" onClick={toggleModal}>
                                        Voir tout les photos!
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div>
                            <strong>{annonce.typeAnnonce}</strong> {annonce.adresse && annonce.adresse["pays"]+", "+annonce.adresse["ville"]}
                        </div>
                        <Description annonce={annonce} diff={diff}/>
                    </div>
                </div>
            </div>
            {/*{isModalOpen&&*/}
                <SlidingPage photos={photos} isOpen={isModalOpen} onSetIsOpen={setIsModalOpen} />
            {/*}*/}

            <Footer />
        </div>
    );
};

export default AnnonceDetails;