import React, { useState, useEffect } from "react";
import axios from 'axios'
import SelectSearch, { fuzzySearch } from 'react-select-search';
import ImageUploadS3 from "../../../../Public/Other/components/Images/ImageUploadS3"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PagesGeneralInfo = (props) => {
    const { formData, inputChange, buttonLabel, submitHandler, imageUpdate } = props
    console.log("formData", formData)
    return (
        <div className="form-body-tabbed">
            <div className="container">
                <form>
                    <div className="row">
                        <h3 className="form-header">General Info</h3>
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label>Page Name</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    placeholder="Page Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => inputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label>Page Handle</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    placeholder="Page handle"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={(e) => inputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="">
                                {/* <SlugInput/> */}
                                <label>Page Category</label>
                            </div>
                            <select 
                                // multiple
                                // data-live-search="true"
                                className="form-select"
                                name="type"
                                value={formData.type}
                                onChange={(e) => inputChange(e)}
                            >
                                <option selected disabled></option>
                                <option value="artist">Artist</option>
                                <option value="producer">Producer</option>
                                <option value="venue">Venue</option>
                            </select>
                            {/* <div className="row">
                                <div class="form-check form-check-inline col">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="producer" />
                                    <label class="form-check-label" for="inlineCheckbox1">Producer</label>
                                </div>
                                <div class="form-check form-check-inline col">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="artist" />
                                    <label class="form-check-label" for="inlineCheckbox2">Artist</label>
                                </div>
                                <div class="form-check form-check-inline col">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="venue" />
                                    <label class="form-check-label" for="inlineCheckbox3">Venue</label>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <label>About</label>
                                <textarea
                                    className=" form-control"
                                    type="text"
                                    placeholder="About"
                                    rows="6"
                                    value={formData.about}
                                    name="about"
                                    onChange={(e) => inputChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row">
                    {/* <input type="submit" className="btn">{buttonLabel}</input> */}
                    <button onClick={e => { e.preventDefault(); submitHandler(formData) }} className="btn">{buttonLabel}</button>
                </div>
            </div>
        </div>
    );
};

export default PagesGeneralInfo;
