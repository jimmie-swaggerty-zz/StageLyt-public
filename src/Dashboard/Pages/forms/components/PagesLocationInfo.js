import axios from "axios";
import React, { useState, useEffect } from "react";
import LocationSearchInput from "./LocationSearchInput";

const PagesLocationInfo = (props) => {
    const { formData, inputChange, buttonLabel, submitHandler, hoursUpdate } = props
    const [hours, setHours] = useState([])

    const hourInputChange = (e) => {
        e.preventDefault()
        let newStateObject = { ...hours };
        newStateObject[e.target.name] = e.target.value;
        setHours(newStateObject);
        hoursUpdate(hours)
        console.log("new data", hours);
    };
    return (
        <div className="form-body-tabbed">
            <div className="container">
                <form>
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <label>Address</label>
                                        <input
                                            className=" form-control"
                                            type="text"
                                            placeholder="Address"
                                            name="address"
                                            value={formData.address}
                                            onChange={(e) => inputChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label>City</label>
                                        <input
                                            className=" form-control"
                                            type="text"
                                            placeholder="City"
                                            name="city"
                                            value={formData.city}
                                            onChange={(e) => inputChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label>State</label>
                                        <input
                                            className=" form-control"
                                            type="text"
                                            placeholder="State"
                                            name="state"
                                            value={formData.state}
                                            onChange={(e) => inputChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label>Zip Code</label>
                                        <input
                                            className=" form-control"
                                            type="text"
                                            placeholder="Zip Code"
                                            name="zipcode"
                                            value={formData.zipcode}
                                            onChange={(e) => inputChange(e)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-4">
                            <label>Hours</label>
                            <div className="input-group mb-3">
                                <span class="input-group-text day-label" id="">Sunday</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="sundaystart"
                                    value={hours.sundaystart}
                                    onChange={(e) => hourInputChange(e)}
                                />
                                <span class="input-group-text" id="">to</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="sundayend"
                                    value={hours.sundayend}
                                    onChange={(e) => hourInputChange(e)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span class="input-group-text day-label" id="">Monday</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="mondaystart"
                                    value={hours.mondaystart}
                                    onChange={(e) => hourInputChange(e)}
                                />
                                <span class="input-group-text" id="">to</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="mondayend"
                                    value={hours.mondayend}
                                    onChange={(e) => hourInputChange(e)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span class="input-group-text day-label" id="">Tuesday</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="tuesdaystart"
                                    value={hours.tuesdaystart}
                                    onChange={(e) => hourInputChange(e)}
                                />
                                <span class="input-group-text" id="">to</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="tuesdayend"
                                    value={hours.tuesdayend}
                                    onChange={(e) => hourInputChange(e)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span class="input-group-text day-label" id="">Wednesday</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="wednesdaystart"
                                    value={hours.wednesdaystart}
                                    onChange={(e) => hourInputChange(e)}
                                />
                                <span class="input-group-text" id="">to</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="wednesdayend"
                                    value={hours.wednesdayend}
                                    onChange={(e) => hourInputChange(e)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span class="input-group-text day-label" id="">Thursday</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="thursdaystart"
                                    value={hours.thursdaystart}
                                    onChange={(e) => hourInputChange(e)}
                                />
                                <span class="input-group-text" id="">to</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="thursdayend"
                                    value={hours.thursdayend}
                                    onChange={(e) => hourInputChange(e)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span class="input-group-text day-label" id="">Friday</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="fridaystart"
                                    value={hours.fridaystart}
                                    onChange={(e) => hourInputChange(e)}
                                />
                                <span class="input-group-text" id="">to</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="fridayend"
                                    value={hours.fridayend}
                                    onChange={(e) => hourInputChange(e)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span class="input-group-text day-label" id="">Saturday</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="saturdaystart"
                                    value={hours.saturdaystart}
                                    onChange={(e) => hourInputChange(e)}
                                />
                                <span class="input-group-text" id="">to</span>
                                <input
                                    className=" form-control"
                                    type="time"
                                    placeholder=""
                                    name="saturdayend"
                                    value={hours.saturdayend}
                                    onChange={(e) => hourInputChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row">
                    {/* <LocationSearchInput/> */}
                    {/* <input type="submit" className="btn">{buttonLabel}</input> */}
                    <button onClick={e => { e.preventDefault(); submitHandler(formData) }} className="btn">{buttonLabel}</button>
                </div>
            </div>
        </div >
    );
};



export default PagesLocationInfo;
