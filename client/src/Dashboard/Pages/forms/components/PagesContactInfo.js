import React, { useState, useEffect } from "react";
import axios from 'axios'
import SelectSearch, { fuzzySearch } from 'react-select-search';
import ImageUploadS3 from "../../../../Public/Other/components/Images/ImageUploadS3"

//import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons'
import {} from '@fortawesome/free-regular-svg-icons'



const PagesContactInfo = (props) => {
    const { formData, inputChange, buttonLabel, submitHandler, websiteUpdate } = props
    const [cities, setCities] = useState([{ id: "chicago", name: "Chicago" }])
    const [websites, setWebsites] = useState([])
    const [website, setWebsite] = useState([])
    const websiteAdd = (e) => {
        let newStateObject = [ ...websites, website ];
        setWebsites(newStateObject);
        console.log("new data", website);
        websiteUpdate(newStateObject)
    }

    const linkInputChange = (e) => {
        let newStateObject = { ...website };
        newStateObject[e.target.name] = e.target.value;
        setWebsite(newStateObject);
        console.log("new data", website);
    };
    return (
        <div className="form-body-tabbed">
            <div className="container">
                <form>
                    <div className="row">
                        <h3 className="form-section-header">Contact Info</h3>
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label>Email Address</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    placeholder="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => inputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label>Phone Number</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    placeholder="Phone Number"
                                    name="phonenumber"
                                    value={formData.phonenumber}
                                    onChange={(e) => inputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="mb-3">
                                {/* <SlugInput/> */}
                                <label>City</label>
                                <select
                                    className="form-select"
                                    name="city_id"
                                    value={formData.city_id}
                                    onChange={(e) => inputChange(e)}
                                >
                                    <option selected></option>
                                    {cities.map((city, idx) => {
                                        return (
                                            <option value={city.id}>{city.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h3 className="form-secion-header">Social Info</h3>
                        <div className="col-lg-3">
                        <div className="mb-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faFacebookF}/></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="@facebook" aria-label="Username" aria-describedby="basic-addon1" name="facebook" value={formData.facebook} onChange={(e) => inputChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                        <div className="mb-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faInstagram}/></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="@instagram" aria-label="Username" aria-describedby="basic-addon1" name="instagram" value={formData.instagram} onChange={(e) => inputChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                        <div className="mb-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faTiktok}/></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="@tiktok" aria-label="Username" aria-describedby="basic-addon1" name="tiktok" value={formData.tiktok} onChange={(e) => inputChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="mb-3">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faTwitter}/></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="@twitter" aria-label="Username" aria-describedby="basic-addon1" name="twitter" value={formData.twitter} onChange={(e) => inputChange(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                        <h3 className="form-section-header">Websites</h3>
                        <div className="col-lg-5">
                            <div className="mb-3">
                                <label>Link Name</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    placeholder="Link Name"
                                    name="name"
                                    onChange={(e) => {e.preventDefault(); linkInputChange(e)}}
                                />
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="mb-3">
                                <label>URL</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    placeholder="URL"
                                    name="url"
                                    onChange={(e) => {e.preventDefault(); linkInputChange(e)}}
                                />
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="mb-3">
                                <label>&nbsp;</label>
                                    <button className="form-control btn" onClick={(e)=>{e.preventDefault(); websiteAdd(e)}}>Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    {websites && websites.map((website, idx)=> {
                            return(
                                <p>{website.name+" - "+website.url}</p>
                            )
                        })}
                    </div> */}
                </form>
                <div className="row">
                    {/* <input type="submit" className="btn">{buttonLabel}</input> */}
                    <button onClick={e => { e.preventDefault(); submitHandler(formData) }} className="btn">{buttonLabel}</button>
                </div>
            </div>
        </div >
    );
};

export default PagesContactInfo;
