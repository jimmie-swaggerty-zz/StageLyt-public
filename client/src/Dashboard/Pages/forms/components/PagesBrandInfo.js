import React, { useState, useEffect } from "react";
import axios from 'axios'
import ImageUploadS3 from "../../../../Public/Other/components/Images/ImageUploadS3";

const PagesBrandInfo = (props) => {
    const { formData, inputChange, buttonLabel, submitHandler, imageUpdate, bannerImageUpdate } = props
    const [cities, setCities] = useState([{ id: "chicago", name: "Chicago" }])
    const [websites, setWebsites] = useState([])
    const [website, setWebsite] = useState([])
    const websiteAdd = (e) => {
        let newStateObject = [...websites, website];
        setWebsites(newStateObject);
        console.log("new data", website);
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
                        <h3 className="form-section-header">Images</h3>
                        <div className="col-lg-4">
                            <div className="mb-3">
                                <label>Profile Image</label>
                            <ImageUploadS3 imageRatioType="square" imageURL={formData.profileImg_id} imageUpdate={imageUpdate} page_id={formData.id}/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="mb-3">
                                <label>Banner Image</label>
                            <ImageUploadS3 imageRatioType="banner" imageURL={formData.bannerImg_id} imageUpdate={bannerImageUpdate}  page_id={formData.id}/>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row">
                    {/* <input type="submit" className="btn">{buttonLabel}</input> */}
                    <button onClick={e => { e.preventDefault(); submitHandler(formData) }} className="btn">{buttonLabel}</button>
                </div>
            </div>
        </div >
    );
};

export default PagesBrandInfo;
