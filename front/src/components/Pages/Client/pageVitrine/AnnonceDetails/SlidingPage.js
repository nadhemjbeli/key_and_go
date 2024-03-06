// import React, {useEffect, useState} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// import './annonce-details.css'; // Import Sass file
// import { Carousel } from 'react-bootstrap';
//
// function SlidingPage(props) {
//     const{isOpen, onSetIsOpen} = props
//
//     const handleClose = () => {
//         onSetIsOpen(false);
//     };
//
//     // useEffect(() => {
//     //     if (isOpen) {
//     //         const body = document.body;
//     //         body.style.overflow = 'hidden'; // Disable scrolling
//     //
//     //         return () => {
//     //             body.style.overflow = 'auto'; // Re-enable scrolling on unmount
//     //         };
//     //     }
//     // }, [isOpen]);
//
//     return (
//         <div className="more">
//
//             {isOpen && (
//                 <div className="slide active">
//                     <div className="slide-inner">
//                         <Carousel className="carousel-slide">
//                             <Carousel.Item>
//                                 <img
//                                     className="d-block w-100"
//                                     src="https://via.placeholder.com/800x400"
//                                     alt="First slide"
//                                 />
//                             </Carousel.Item>
//                             <Carousel.Item>
//                                 <img
//                                     className="d-block w-100"
//                                     src="https://via.placeholder.com/800x400"
//                                     alt="Second slide"
//                                 />
//                             </Carousel.Item>
//                             <Carousel.Item>
//                                 <img
//                                     className="d-block w-100"
//                                     src="https://via.placeholder.com/800x400"
//                                     alt="Third slide"
//                                 />
//                             </Carousel.Item>
//                         </Carousel>
//                         {/* Your page content here */}
//                         {/*<img src="" alt=""/>*/}
//                         <button className="close-button" onClick={handleClose}>
//                             <FontAwesomeIcon icon={faTimesCircle} />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default SlidingPage;

import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './annonce-details.css'; // Import Sass file
import { Carousel } from 'react-bootstrap';
import {BASE_URL} from "../../../../../config";

function SlidingPage({ photos, isOpen, onSetIsOpen }) {
    const handleClose = () => {
        onSetIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            const body = document.body;
            body.style.overflow = 'hidden'; // Disable scrolling

            return () => {
                body.style.overflow = 'auto'; // Re-enable scrolling on unmount
            };
        }
    }, [isOpen]);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            {isOpen && (
                <div className="slide">
                    <button className="close-button" onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                    {/*<div className="slide-inner">*/}
                        <div className="carousel-container">
                            <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} interval={null} nextIcon={<FontAwesomeIcon icon={faChevronRight} />} prevIcon={<FontAwesomeIcon icon={faChevronLeft} />} prevLabel="" nextLabel="">
                                {photos && photos.map((photo, index)=>(
                                    <Carousel.Item key={index} >
                                        <img
                                            className="d-block w-100 img-fluid"
                                            src={BASE_URL+"/uploads/"+photo}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    {/*</div>*/}

                </div>
            )}
        </div>
    );
}

export default SlidingPage;
