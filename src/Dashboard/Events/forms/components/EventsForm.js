import React, { useState } from "react";
import { Route, Link, Switch, NavLink, useRouteMatch } from "react-router-dom";
import EventAccounting from "./EventAccounting";
import EventsCast from "./EventsCast";
import EventsGeneralInfo from "./EventsGeneralInfo";
import EventsTech from "./EventsTech";


const EventsForm = (props) => {
    const { initialData, title, submitHandler, buttonLabel, type } = props;
    const [formData, setFormData] = useState(initialData)
    const inputChange = (e) => {
        let newStateObject = { ...formData };
        newStateObject[e.target.name] = e.target.value;
        setFormData(newStateObject);
        console.log("new data", formData);
    };
    const imageUpdate = (image) => {
        let newStateObject = { ...formData };
        newStateObject.bannerImg_id = image;
        setFormData(newStateObject);
        console.log("new data", formData);
    }
    const descriptionUpdate = (descript) => {
        console.log("descript is:", descript)
        let newStateObject = { ...formData };
        newStateObject.description = descript;
        setFormData(newStateObject);
        console.log("new data", formData);
    }

    return (
        <div className="container profile-wrapper mb-3">
            <h2 className="mt-3">{title}</h2>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
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
                        id="tech-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#tech"
                        type="button"
                        role="tab"
                        aria-controls="tech"
                        aria-selected="false"
                    >
                        Tech Info
                    </button>
                </li>
                {type && <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="tech-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#cast"
                        type="button"
                        role="tab"
                        aria-controls="cast"
                        aria-selected="false"
                    >
                        Cast Info
                    </button>
                </li>}
                {/* <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="ticket-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#ticket"
                        type="button"
                        role="tab"
                        aria-controls="ticket"
                        aria-selected="false"
                    >
                       Tickets
                    </button>
                    </li> */}
                {/* <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="accounting-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#accounting"
                        type="button"
                        role="tab"
                        aria-controls="accounting"
                        aria-selected="false"
                    >
                       Accounting
                    </button>
                </li> */}
            </ul>
            <div className="tab-content" id="myTabContent">
                <div
                    class="tab-pane fade show active"
                    id="gen"
                    role="tabpanel"
                    aria-labelledby="gen-tab"
                >
                    <EventsGeneralInfo formData={formData} inputChange={inputChange} submitHandler={submitHandler} buttonLabel={buttonLabel} imageUpdate={imageUpdate}  page_id={formData.id} descriptionUpdate={descriptionUpdate} />
                </div>
                <div
                    class="tab-pane fade"
                    id="tech"
                    role="tabpanel"
                    aria-labelledby="tech-tab"
                >
                    <EventsTech formData={formData} inputChange={inputChange}  submitHandler={submitHandler} buttonLabel={buttonLabel}/>
                </div>
                <div
                    class="tab-pane fade"
                    id="cast"
                    role="tabpanel"
                    aria-labelledby="cast-tab"
                >
                    <EventsCast formData={formData}/>
                </div>
                <div
                    class="tab-pane fade"
                    id="ticket"
                    role="tabpanel"
                    aria-labelledby="ticket-tab"
                >
                    <h1>Coming Soon</h1>
                </div>
                <div
                    class="tab-pane fade"
                    id="accounting"
                    role="tabpanel"
                    aria-labelledby="accounting-tab"
                >
                    <EventAccounting  formData={formData} inputChange={inputChange}  submitHandler={submitHandler} buttonLabel={buttonLabel}/>
                </div>
            </div>


        </div>
    );
};

export default EventsForm;
