
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {BASE_URL} from "../../../../../config";
import "animate.css"

const MySwal = withReactContent(Swal);

const showDetailsModal = (annonces, expandedAnnouncement) => {
    MySwal.fire({
        title: 'Détails',
        html: (
            <div className="announcement-details">
                <div className="description">Description: {annonces[expandedAnnouncement].description}</div>
                <div className="details-row row">
                    <table className="details-column col-md-6 col-sm-10">
                        <tbody>
                        <tr>
                            <th>Place:</th>
                            <td>{annonces[expandedAnnouncement].adresse.ville}, {annonces[expandedAnnouncement].adresse.pays}</td>
                        </tr>
                        <tr>
                            <th>Capacité:</th>
                            <td>{annonces[expandedAnnouncement].capacite} personnes</td>
                        </tr>
                        </tbody>
                    </table>
                        <table className="details-column col-md-6 col-sm-10">
                            <tbody>
                            <tr>
                                <th>Chambres:</th>
                                <td>{annonces[expandedAnnouncement].chambres}</td>
                            </tr>
                            <tr>
                                <th>Salles de bain:</th>
                                <td>{annonces[expandedAnnouncement].sallesDeBain}</td>
                            </tr>
                            </tbody>
                        </table>
                </div>
                <div className="">
                    <div>Commodités: {annonces[expandedAnnouncement].commodites.join(', ')}</div>
                    <div>Règles: {annonces[expandedAnnouncement].regles.join(', ')}</div>
                </div>
                <div className="photos">
                    <p>Photos:</p>
                    {annonces[expandedAnnouncement].photos.map((photo, index) => (
                        <img key={index} src={`${BASE_URL}/uploads/${photo}`} alt={`Photo ${index + 1}`} className="photo" />
                    ))}
                </div>
            </div>
        ),
        showCloseButton: true,
        customClass: {
            container: 'details-modal',
            popup: 'details-modal-popup col-md-7 col-sm-10'
        },
        showConfirmButton: false,
        showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
        },
        hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
        }
    });
};

export default showDetailsModal;