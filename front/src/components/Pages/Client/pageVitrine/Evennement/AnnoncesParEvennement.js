import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import axios from "axios";
import {BASE_URL} from "../../../../../config";
import EvennementImagesSlideBanner from "./EvennementImagesSlideBanner";
import "./Evennement.css"
import Annonces from "../Annonces";
import DatePicker from "react-datepicker";
import {CSSTransition} from "react-transition-group";
import {addDays, differenceInDays} from "date-fns";

const AnnoncesParEvennement = props => {
    const { id} = useParams();
    const [evennement, setEvennement] = useState({})
    const [annonces, setAnnonces] = useState([])
    const [images, setImages] = useState([])

    // TODO choose dates
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(),3));
    const [difference, setDifference] = useState(3);

    const CustomDatePickerstartDate = ({ value, onChange, onClick }) => (
        <div className="react-datepicker__input-container">
            <i className="fa fa-calendar fa-2x tm-form-element-icon"></i>
            <input
                type="text"
                name="startDate"
                // style={{height: "100%"}}
                autoComplete="off"
                className="form-control date"
                defaultValue={value}
                onChange={onChange}
                onClick={onClick}
                placeholder="Select date"
            />
        </div>
    );
    const CustomDatePickerendDate = ({ value, onChange, onClick }) => (
        <div className="react-datepicker__input-container">
            <i className="fa fa-calendar fa-2x tm-form-element-icon"></i>
            <input
                type="text"
                name="endDate"
                className="form-control"
                // style={{height: "100%"}}
                autoComplete="off"
                defaultValue={value}
                onChange={onChange}
                onClick={onClick}
                placeholder="Select date"
            />
        </div>
    );

    const handleStartDateChange = date => {
        setStartDate(date);
        setEndDate(addDays(date,3))
        setDifference(3)
    };
    const handleEndDateChange = date => {
        setEndDate(date);
        const diff = differenceInDays(date, startDate)
        setDifference(diff+1)
    };

    const fetchEvennement = async ()=>{
        try {
            // console.log("event")
            const response = await axios.get(BASE_URL+'/api/event/'+id);
            setEvennement(response.data); // Set the fetched keys
            console.log("evennementt")
            console.log(response.data)
            setImages(response.data.images)
        } catch (error) {
            console.error('Error fetching EVENTS:', error);
        }
    }
    const fetchAnnoncesParEvennement = async ()=>{
        try {
            // console.log("event")
            const response = await axios.get(BASE_URL+'/api/annonce/by_event/'+id);
            setAnnonces(response.data); // Set the fetched keys
            console.log("Annonces par evennement")
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching EVENTS:', error);
        }
    }
    useEffect(()=>{
        fetchEvennement()
        fetchAnnoncesParEvennement()
    },[])

    const handleSubmitRecherche = (e)=>{
        e.preventDefault()
        console.log(startDate)
    }
    return (
        <div>
            <NavigationBar/>
            <div className="tm-section tm-bg-img centered-contents" style={{marginTop:"1rem"}} id="tm-section-1">
                <div className="container">
                    <h4 className="titre">{evennement.titre}</h4>
                    <EvennementImagesSlideBanner images={images}/>
                </div>
            </div>
            <div className="container">

                <div className="kg-content">
                    <div className="search-form">
                        <div className="tm-bg-dark-blue ie-container-width-fix-2">
                            <div className="container ie-h-align-center-fix ">
                                <div className="row">
                                    <div className="col-xs-12 ml-auto mr-auto ie-container-width-fix">
                                        <form onSubmit={handleSubmitRecherche} method="get" className="tm-search-form tm-section-pad-2">
                                            <div className="form-row tm-search-form-row">
                                                <div className="form-group tm-form-element tm-form-element-100 datepicker">
                                                    <i className="fa fa-calendar fa-2x tm-form-element-icon"></i>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={handleStartDateChange}
                                                        selectsStart
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        minDate={new Date()}
                                                        dateFormat="EEE MMM dd yyyy"
                                                        placeholderText="Check In"
                                                        className="form-control"
                                                        customInput={<CustomDatePickerstartDate value={startDate} onChange={() => {}} />}
                                                        // highlightDates={startDate?[{ date: startDate, color: "#00FF00" }]:[]}
                                                    />
                                                </div>
                                                <div className="form-group tm-form-element tm-form-element-100">
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={handleEndDateChange}
                                                        // onSelect={handleEndDateInputClick}
                                                        defaultValue={endDate}
                                                        startDate={startDate || new Date()}
                                                        endDate={endDate}
                                                        minDate={startDate || new Date()}
                                                        dateFormat="EEE MMM dd yyyy"
                                                        placeholderText="Check Out"
                                                        className="form-control"
                                                        id="inputCheckOut"
                                                        customInput={<CustomDatePickerendDate value={endDate} onChange={() => {}} />}
                                                        // highlightDates={highlightDateRange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row tm-search-form-row">
                                                <div className="form-group tm-form-element tm-form-element-100">
                                                    <select name="personnes"
                                                            className="form-control tm-select"
                                                            // onChange={handleChange}  // Add onChange event handler
                                                            // value={searchData.personnes}  // Add value attribute to maintain controlled component
                                                            id="personnes">
                                                        <option value="">Personnes</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                    <i className="fa fa-2x fa-user tm-form-element-icon"></i>
                                                </div>
                                                <div className="form-group tm-form-element tm-form-element-100">
                                                    <select name="chambres"
                                                            className="form-control tm-select"
                                                            // onChange={handleChange}  // Add onChange event handler
                                                            // value={searchData.chambres}  // Add value attribute to maintain controlled component
                                                            id="chambres">
                                                        <option value="">Chambres</option>
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                    <i className="fa fa-2x fa-bed tm-form-element-icon"></i>
                                                    {/*<i className="fa fa-bed tm-form-element-icon tm-form-element-icon-small"></i>*/}
                                                </div>
                                                <div className="form-group tm-form-element tm-form-element-100">
                                                    <button type="submit" className="btn btn-beige tm-btn-search">Voir les disponibilités</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5>Des Annonces prêts à cet evennement:</h5>
                    <Annonces annonces={annonces} difference={difference}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default AnnoncesParEvennement;