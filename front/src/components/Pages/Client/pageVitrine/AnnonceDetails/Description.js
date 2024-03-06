import React, {useState} from 'react';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BASE_URL} from "../../../../../config";
import {format} from "date-fns";

const Description = (props) => {
    const {annonce, diff} = props
    const [activeTab, setActiveTab] = useState("ex1-pills-1");

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    }
    return (
        <section className="section-desc border-top py-4">
            <div className="description">
                <div className="row gx-4">
                    <div className="part1 col-lg-8 col-md-8 mb-4">
                        <div className="border rounded-2 px-3 py-2 bg-white">
                            {/* Pills navs */}
                            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                <li className="nav-item d-flex" role="presentation">
                                    <a className={`nav-link d-flex align-items-center justify-content-center w-100 tm-color-primary btn-desc ${activeTab === "ex1-pills-1" ? 'active' : ''}`} onClick={() => handleTabClick("ex1-pills-1")} aria-controls="ex1-pills-1" aria-selected={activeTab === "ex1-pills-1"}>Specification</a>
                                </li>
                                {annonce.typeAnnonce === "Chambre privée"?
                                    <li className="nav-item d-flex" role="presentation">
                                        <a className={`nav-link d-flex align-items-center justify-content-center w-100 tm-color-primary btn-desc ${activeTab === "ex1-pills-2" ? 'active' : ''}`} onClick={() => handleTabClick("ex1-pills-2")} aria-controls="ex1-pills-2" aria-selected={activeTab === "ex1-pills-2"}>Programme</a>
                                    </li>:""
                                }
                                <li className="nav-item d-flex" role="presentation">
                                    <a className={`nav-link d-flex align-items-center justify-content-center w-100 tm-color-primary btn-desc ${activeTab === "ex1-pills-3" ? 'active' : ''}`} onClick={() => handleTabClick("ex1-pills-3")} aria-controls="ex1-pills-3" aria-selected={activeTab === "ex1-pills-3"}>Warranty info</a>
                                </li>

                                <li className="nav-item d-flex" role="presentation">
                                    <a className={`nav-link d-flex align-items-center justify-content-center w-100 tm-color-primary btn-desc ${activeTab === "ex1-pills-4" ? 'active' : ''}`} onClick={() => handleTabClick("ex1-pills-4")} aria-controls="ex1-pills-4" aria-selected={activeTab === "ex1-pills-4"}>Seller profile</a>
                                </li>
                            </ul>
                            {/* Pills navs */}
                            {/* Pills content */}
                            <div className="tab-content" id="ex1-content">
                                <div className={`tab-pane fade ${activeTab === "ex1-pills-1" ? 'show active' : ''}`} id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                                    <p>
                                        {annonce.description}
                                    </p>
                                    <div className="row mb-2">
                                        <div className="col-12 col-md-6">
                                            <ul className="list-unstyled mb-0">
                                                <li><i className="fas fa-check text-success me-2" />Some great feature name here</li>
                                                <li><i className="fas fa-check text-success me-2" />Lorem ipsum dolor sit amet, consectetur</li>
                                                <li><i className="fas fa-check text-success me-2" />Duis aute irure dolor in reprehenderit</li>
                                                <li><i className="fas fa-check text-success me-2" />Optical heart sensor</li>
                                            </ul>
                                        </div>
                                        <div className="col-12 col-md-6 mb-0">
                                            <h6>Ce que propose ce logement:</h6>
                                            <ul className="list-unstyled">
                                                {
                                                    annonce.commodites?
                                                        <>
                                                            {annonce.commodites && annonce.commodites.map((commodite, index)=>(
                                                                <li key={index}><FontAwesomeIcon icon={faCheck} className="text-success me-2" /> {commodite}</li>
                                                            ))}
                                                        </>:<div>
                                                        pas de propositions
                                                        </div>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <table className="table border mt-3 mb-2">
                                        <tbody><tr>
                                            <th className="py-2" width="40%">Chambres:</th>
                                            <td className="py-2">{annonce.chambres}</td>
                                        </tr>
                                        <tr>
                                            <th className="py-2">Capacité:</th>
                                            <td className="py-2">{annonce.capacite}</td>
                                        </tr>
                                        <tr>
                                            <th className="py-2">Salles de bain:</th>
                                            <td className="py-2">{annonce.sallesDeBain}</td>
                                        </tr>
                                        </tbody></table>
                                </div>
                                <div className={`tab-pane fade ${activeTab === "ex1-pills-2" ? 'show active' : ''}`} id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                                    {annonce.evennement &&
                                        <div>
                                            <h4>{annonce.evennement.titre} </h4>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <img width={"100%"} style={{borderRadius:"15px"}} src={BASE_URL+"/uploads/"+annonce.evennement.images[0]} alt=""/>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{annonce.evennement.description}</p>
                                                    <span style={{float:"right"}}>{format(annonce.evennement.dateDebut, 'EEE MMM dd yyyy').toString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                    }
                                </div>
                                <div className={`tab-pane fade ${activeTab === "ex1-pills-3" ? 'show active' : ''}`} id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                                    Another tab content or sample information now <br />
                                    Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </div>
                                <div className={`tab-pane fade ${activeTab === "ex1-pills-4" ? 'show active' : ''}`} id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                                    Some other tab content or sample information now <br />
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                    officia deserunt mollit anim id est laborum.
                                </div>
                            </div>
                            {/* Pills content */}
                        </div>
                    </div>
                    <div className="part2 col-lg-4">
                        <div className="px-0 border rounded-2 shadow-0">
                            <div className="card">
                                <div className="card-body">
                                    {/*<h5 className="card-title">Similar items</h5>*/}
                                    <div className="prix">
                                        <span><strong>€ {annonce.prix}</strong> par nuit</span>
                                    </div>
                                    {diff&& diff>0 && /^\d+$/.test(diff) &&
                                        <div className="prix-nuits">
                                            <span><strong>€ {annonce.prix}</strong> * {diff>1? diff+" nuits": diff+"nuit"}</span>
                                            <strong style={{float:"right", marginRight:"1rem"}}>€ {annonce.prix * diff}</strong>
                                        </div>
                                    }
                                    {/*<div className="d-flex mb-3">*/}
                                    {/*    <a href="#" className="me-3">*/}
                                    {/*        <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp" style={{minWidth: '96px', height: '96px'}} className="img-md img-thumbnail" />*/}
                                    {/*    </a>*/}
                                    {/*    <div className="info">*/}
                                    {/*        <a href="#" className="nav-link mb-1">*/}
                                    {/*            Rucksack Backpack Large <br />*/}
                                    {/*            Line Mounts*/}
                                    {/*        </a>*/}
                                    {/*        <strong className="text-dark"> $38.90</strong>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className="d-flex mb-3">*/}
                                    {/*    <a href="#" className="me-3">*/}
                                    {/*        <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp" style={{minWidth: '96px', height: '96px'}} className="img-md img-thumbnail" />*/}
                                    {/*    </a>*/}
                                    {/*    <div className="info">*/}
                                    {/*        <a href="#" className="nav-link mb-1">*/}
                                    {/*            Summer New Men's Denim <br />*/}
                                    {/*            Jeans Shorts*/}
                                    {/*        </a>*/}
                                    {/*        <strong className="text-dark"> $29.50</strong>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className="d-flex mb-3">*/}
                                    {/*    <a href="#" className="me-3">*/}
                                    {/*        <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" style={{minWidth: '96px', height: '96px'}} className="img-md img-thumbnail" />*/}
                                    {/*    </a>*/}
                                    {/*    <div className="info">*/}
                                    {/*        <a href="#" className="nav-link mb-1"> T-shirts with multiple colors, for men and lady </a>*/}
                                    {/*        <strong className="text-dark"> $120.00</strong>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className="d-flex">*/}
                                    {/*    <a href="#" className="me-3">*/}
                                    {/*        <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp" style={{minWidth: '96px', height: '96px'}} className="img-md img-thumbnail" />*/}
                                    {/*    </a>*/}
                                    {/*    <div className="info">*/}
                                    {/*        <a href="#" className="nav-link mb-1"> Blazer Suit Dress Jacket for Men, Blue color </a>*/}
                                    {/*        <strong className="text-dark"> $339.90</strong>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Description;