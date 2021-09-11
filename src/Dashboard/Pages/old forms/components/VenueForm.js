import React, { useState } from "react";

const VenueForm = (props) => {
    const [data, setData] = useState({});

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const inputChange = (e) => {
        let newStateObject = { ...data };
        newStateObject[e.target.name] = e.target.value;
        setData(newStateObject);
        // console.log(data);
    };

    const submitHandler = (e) => {};
    return (
        <div className="container">
            <div className="form-body">
                <form onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-8">
                            <div className="mb-3">
                                <label>Venue Name</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    placeholder="Venue Name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => inputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Slug</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    placeholder="Slug"
                                    name="slug"
                                    value={data.slug}
                                    onChange={(e) => {
                                        e.target.value = e.target.value
                                            .replace(" ", "-")
                                            .toLowerCase();
                                        inputChange(e);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Address</label>
                                <input
                                    className=" form-control"
                                    type="address"
                                    placeholder="address"
                                    name="address"
                                    value={data.address}
                                    onChange={(e) => {inputChange(e)}}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Info</label>
                                <textarea
                                    className=" form-control"
                                    type="text"
                                    placeholder="Artist Bio"
                                    name="bio"
                                    value={data.bio}
                                    onChange={(e) => inputChange(e)}
                                    rows="13"
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <label>Profile Image</label>
                            <div className="mb-3">
                                <div className="profile-header-image"></div>
                                <input type="file" className="form-control" />
                            </div>
                            <label>Venue Hours</label>
                            {days.map((day) => {
                                return (
                                    <div class="input-group mb-3">
                                        {/* <div class="input-group-text">
                                            <input
                                                class="form-check-input mt-0"
                                                type="checkbox"
                                                value=""
                                                aria-label="Checkbox for following text input"
                                            />
                                        </div> */}
                                        <span
                                            class="input-group-text day-field"
                                            id="basic-addon1"
                                        >
                                            {day}
                                        </span>
                                        <input
                                            type="time"
                                            class="form-control"
                                            aria-label="Text input with checkbox"
                                        />
                                        <span
                                            class="input-group-text"
                                            id="basic-addon1"
                                        >
                                            -
                                        </span>

                                        <input
                                            type="time"
                                            class="form-control"
                                            aria-label="Text input with checkbox"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VenueForm;
