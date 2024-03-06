import React, {useState} from 'react';
import {Carousel} from "react-bootstrap";
import img1 from "../../../../img/img-01.jpg"
import img2 from "../../../../img/img-02.jpg"
import img3 from "../../../../img/img-03.jpg"
import "./Evennement.css"
import {containerClasses} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../../../../config";
const SlideBannerMainEvennement = (props) => {
    const {evennements} = props
    return (
        <div className="evennements-container">
            <Carousel className="evennements" interval={null} prevLabel="" nextLabel="">
                {evennements && evennements.map((evennement)=>(
                    <Carousel.Item key={evennement._id}
                                   onClick={()=>{window.location = "/event/"+evennement._id}}
                    >
                        {/*<ExampleCarouselImage text="First slide" />*/}
                        <img src={BASE_URL+"/uploads/"+evennement.images[0]} alt="" style={{cursor:"pointer"}}/>
                        <Carousel.Caption>
                            <div className="caption">
                                <h3>{evennement.titre}</h3>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default SlideBannerMainEvennement;