import React, { useState } from "react";

const EventsTech = (props) => {
    const { formData, inputChange, buttonLabel, submitHandler } = props
    return (
        <div className="form-body-tabbed">
                          <div className="container">
            <form>
  
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="mb-3">
                                <label className="form-label">Tech Info</label>
                                <textarea
                                    className=" form-control"
                                    type="text"
                                    placeholder="Tech Description"
                                    rows="6"
                                    value={formData.techInfo}
                                    name="techInfo"
                                    onChange={(e) => inputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Pay Info</label>
                                <textarea
                                    className=" form-control"
                                    type="text"
                                    placeholder="Pay Info"
                                    rows="6"
                                    value={formData.payInfo}
                                    name="payInfo"
                                    onChange={(e) => inputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="row">
                                <div className="mb-3 col-4">
                                    <label className="form-label">
                                        Call Time
                                    </label>
                                    <input
                                        className=" form-control"
                                        type="time"
                                        placeholder="Event Name"
                                        value={formData.callTime}
                                        name="callTime"
                                        onChange={(e) => inputChange(e)}
                                    />
                                </div>
                                <div className="mb-3 col-8">
                                    <label className="form-label">
                                        Tech Due
                                    </label>
                                    <input
                                        className=" form-control"
                                        type="datetime-local"
                                        placeholder="Event Name"
                                        value={formData.techDue}
                                        name="techDue"
                                        onChange={(e) => inputChange(e)}
                                    />
                                </div>
                            </div>
                         
                        </div>
                    </div>
                    </form>
                    <div className="row">
                {/* <input type="submit" className="btn">{buttonLabel}</input> */}
                <button onClick={e => { e.preventDefault(); submitHandler(formData) }} className="btn">Submit</button>
            </div>
                </div>


        </div>
    );
};

export default EventsTech;
