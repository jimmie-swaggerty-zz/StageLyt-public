import axios from "axios";
import React, { useState } from "react";
import { Route, Link, Switch, NavLink, useRouteMatch } from "react-router-dom";
import PagesBrandInfo from "./PagesBrandInfo";
import PagesContactInfo from "./PagesContactInfo";
import PagesGeneralInfo from "./PagesGeneralInfo";
import PagesLocationInfo from "./PagesLocationInfo";

const PagesForm = (props) => {
    const { initialData, title, submitHandler, buttonLabel } = props;
    const [formData, setFormData] = useState(initialData)
    console.log("form Data", formData)

    const inputChange = (e) => {
        e.preventDefault()
        let newStateObject = { ...formData };
        newStateObject[e.target.name] = e.target.value;
        setFormData(newStateObject);
        console.log("new data", formData);
    };

    const imageUpdate = (image) => {
        let newStateObject = { ...formData };
        newStateObject.profileImg_id = image
        setFormData(newStateObject);
        console.log("new data", formData);
    }

    const hoursUpdate = (hours) =>{
        let newStateObject = { ...formData };
        newStateObject.hours = hours
        setFormData(newStateObject);
        console.log("new data", formData);
    }

    const websiteUpdate = (websites) =>{
        let newStateObject = { ...formData };
        newStateObject.websites = websites
        setFormData(newStateObject);
        console.log("new data", formData);
    }

    const bannerImageUpdate = (image) => {
        let newStateObject = { ...formData };
        newStateObject.bannerImg_id = image
        setFormData(newStateObject);
        console.log("new data", formData);
    }
    return (
        <div className="container mt-4 mb-3">
            <div className="card">
                <div className="card-header">
                    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link active"
                                id="gen-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#gen"
                                type="button"
                                role="tab"
                                aria-controls="gen"
                                aria-selected="true"
                            >
                                General Info
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link"
                                id="contact-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#contact"
                                type="button"
                                role="tab"
                                aria-controls="contact"
                                aria-selected="false"
                            >
                                Contact Info
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link"
                                id="brand-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#brand"
                                type="button"
                                role="tab"
                                aria-controls="brand"
                                aria-selected="false"
                            >
                                Brand
                            </button>
                        </li>
                        {formData.type === "venue" && <li class="nav-item" role="presentation">
                            <button
                                class="nav-link"
                                id="location-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#location"
                                type="button"
                                role="tab"
                                aria-controls="location"
                                aria-selected="false"
                            >
                                Location Info
                            </button>
                        </li>}
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div
                        class="tab-pane fade show active"
                        id="gen"
                        role="tabpanel"
                        aria-labelledby="gen-tab"
                    >
                        <PagesGeneralInfo formData={formData} inputChange={inputChange} submitHandler={submitHandler} buttonLabel={buttonLabel} />
                    </div>
                    <div
                        class="tab-pane fade"
                        id="contact"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                    >
                        <PagesContactInfo formData={formData} inputChange={inputChange} submitHandler={submitHandler} buttonLabel={buttonLabel} websiteUpdate={websiteUpdate} />
                    </div>
                    <div
                        class="tab-pane fade"
                        id="brand"
                        role="tabpanel"
                        aria-labelledby="brand-tab"
                    >
                        <PagesBrandInfo formData={formData} inputChange={inputChange} submitHandler={submitHandler} buttonLabel={buttonLabel} bannerImageUpdate={bannerImageUpdate} imageUpdate={imageUpdate} />
                    </div>
                    <div
                        class="tab-pane fade"
                        id="location"
                        role="tabpanel"
                        aria-labelledby="location-tab"
                    >
                        <PagesLocationInfo  formData={formData} inputChange={inputChange} submitHandler={submitHandler} buttonLabel={buttonLabel} hoursUpdate={hoursUpdate}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagesForm;
