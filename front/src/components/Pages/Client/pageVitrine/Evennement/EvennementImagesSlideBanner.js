import React from 'react';
import {Carousel} from "react-bootstrap";
import {BASE_URL} from "../../../../../config";

const EvennementImagesSlideBanner = (props) => {
    const {images} = props
    return (
        <div className="evennements-container">
            {images&&<Carousel className="evennements" interval={null} prevLabel="" nextLabel="">
                {images && images.map((image, index)=>(
                    <Carousel.Item key={index}
                    >
                        {/*<ExampleCarouselImage text="First slide" />*/}
                        <img src={BASE_URL+"/uploads/"+image} alt="" style={{cursor:"pointer"}}/>
                    </Carousel.Item>
                ))}
            </Carousel>}
        </div>
    );
};

export default EvennementImagesSlideBanner;