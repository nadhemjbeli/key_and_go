import React, {useState, useEffect} from 'react';
import NavigationBar from "./NavigationBar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSSTransition } from 'react-transition-group';
import Annonces from "./Annonces";
import axios from "axios";
import {BASE_URL} from "../../../../config";
import Footer from "./Footer";
import SweetAlert from "react-bootstrap-sweetalert";
import {addDays, differenceInDays, format} from 'date-fns';
import {useLocation, useNavigate} from "react-router-dom";
import SlideBannerMainEvennement from "./Evennement/SlideBannerMain";
function Main(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(),3));
    const [difference, setDifference] = useState(3);
    const [annonces, setAnnonces] = useState([]);
    const [searchData, setSearchData] = useState({
        location: searchParams.get('location'),
        personnes: searchParams.get('personnes'),
        chambres: searchParams.get('chambres'),
    });
    const queryData = {
        location: searchParams.get('location'),
        personnes: searchParams.get('personnes'),
        chambres: searchParams.get('chambres'),
    };

    const [evennements, setEvennements]=useState([])
    const fetchEvennements = async ()=>{
        try {
            // console.log("events")
            const response = await axios.get(BASE_URL+'/api/event');
            // console.log(response.data)
            setEvennements(response.data); // Set the fetched keys
        } catch (error) {
            console.error('Error fetching EVENTS:', error);
        }
    }

    const handleChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };

    const highlightDateRange = startDate && endDate ? [{ startDate, endDate, color: "#00FF00" }] : [];
    const navigate = useNavigate();

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

    const startDateValue = startDate ? format(startDate, 'EEE MMM dd yyyy') : '';
    const endDateValue = endDate ? format(endDate, 'EEE MMM dd yyyy').toString() : '';


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
    const fetchAnnonces = async () => {
        try {
            let query = {};

            // Check if location parameter exists and construct query accordingly
            if (queryData.location) {
                query = { ...query, location: queryData.location };
            }

            // Check if personnes parameter exists and construct query accordingly
            if (queryData.personnes) {
                query = { ...query, personnes: queryData.personnes };
            }

            // Check if chambres parameter exists and construct query accordingly
            if (queryData.chambres) {
                query = { ...query, chambres: queryData.chambres };
            }
            console.log(query)
            const response = await axios.get(`${BASE_URL}/api/annonce`, {params:query});
            setAnnonces(response.data);
            // console.log("response")
            // console.log(response.data)
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    useEffect(() => {
        // console.log()
        fetchAnnonces()
        fetchEvennements()
    }, []);

    const handleSubmit =(e)=>{
        e.preventDefault();
        let url = "/main"
        if (searchData.location || searchData.personnes || searchData.chambres) {
            url += "?";

            if (searchData.location) {
                url += `location=${searchData.location}&`;
            }

            if (searchData.personnes) {
                url += "personnes=" + searchData.personnes + "&";
            }

            if (searchData.chambres) {
                url += "chambres=" + searchData.chambres + "&";
            }
        }
        console.log(url);
        window.location = url;
        // fetchAnnonces()
        // navigate(url);
    }


    return (
        <div className="tm-main-content" id="top">
            <NavigationBar />
            <div className="tm-section tm-bg-img centered-contents" id="tm-section-1">

                <div className="logo-centered">
                    <div className="title">Key and Go</div>
                    <div className="slogan">Where renting makes ease!</div>
                </div>
                <div className="tm-bg-beige ie-container-width-fix-2">
                    <div className="container ie-h-align-center-fix ">
                        <div className="row">
                            <div className="col-xs-12 ml-auto mr-auto ie-container-width-fix">
                                <form onSubmit={handleSubmit} method="get" className="tm-search-form tm-section-pad-2">
                                    <div className="form-row tm-search-form-row">
                                        <div className="form-group tm-form-element tm-form-element-100">
                                            <i className="fa fa-map-marker fa-2x tm-form-element-icon"></i>
                                            <input name="location"
                                                   style={{height: "100%"}} onChange={handleChange}
                                                   value={searchData.location} autoComplete="off" type="text" className="form-control" id="inputCity" placeholder="Type your destination..." />
                                        </div>
                                            <div className="form-group tm-form-element tm-form-element-50">
                                                <i className="fa fa-calendar fa-2x tm-form-element-icon"></i>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={handleStartDateChange}
                                                    selectsStart
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    minDate={new Date()}
                                                    dateFormat="EEE MMM dd yyyy"
                                                    customInput={<CustomDatePickerstartDate value={startDateValue} onChange={() => {}} />}
                                                    highlightDates={startDate?[{ date: startDate, color: "#00FF00" }]:[]}
                                                />
                                            </div>
                                            <div className="form-group tm-form-element tm-form-element-50">
                                                <CSSTransition
                                                    in={startDate !== null}
                                                    timeout={300}
                                                    classNames="fade"
                                                    unmountOnExit
                                                >
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={handleEndDateChange}
                                                    defaultValue={endDate}
                                                    startDate={startDate || new Date()}
                                                    endDate={endDate}
                                                    minDate={startDate || new Date()}
                                                    dateFormat="EEE MMM dd yyyy"
                                                    placeholderText="Check Out"
                                                    className="form-control"
                                                    id="inputCheckOut"
                                                    customInput={<CustomDatePickerendDate value={endDateValue} onChange={() => {}} />}
                                                    highlightDates={highlightDateRange}
                                                />
                                                </CSSTransition>
                                            </div>
                                    </div>
                                    <div className="form-row tm-search-form-row">
                                        <div className="form-group tm-form-element tm-form-element-100">
                                            <select
                                                name="personnes"
                                                className="form-control tm-select"
                                                onChange={handleChange}
                                                value={searchData.personnes}
                                                id="personnes"
                                            >
                                                <option value="">Personnes</option>
                                                {[...Array(10)].map((_, index) => (
                                                    <option key={index + 1} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            <i className="fa fa-2x fa-user tm-form-element-icon"></i>
                                        </div>
                                        <div className="form-group tm-form-element tm-form-element-100">
                                            <select name="chambres"
                                                    className="form-control tm-select"
                                                    onChange={handleChange}  // Add onChange event handler
                                                    value={searchData.chambres}  // Add value attribute to maintain controlled component
                                                    defaultValue={queryData.chambres}
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
                                            <i className="fa fa-2x fa-home tm-form-element-icon"></i>
                                        </div>
                                        <div className="form-group tm-form-element tm-form-element-100">
                                            <button type="submit" className="btn btn-primary tm-btn-search">Check Availability</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <SlideBannerMainEvennement evennements={evennements}/>
                <Annonces annonces={annonces} difference={difference} />
            </div>




            <Footer />


        </div>


    );
}

export default Main;