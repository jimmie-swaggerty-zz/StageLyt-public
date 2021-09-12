import React, { useState, useEffect } from "react";
import axios from 'axios'
import BookingLine from "./BookingLine";
const EventsCast = (props) => {
    const { formData } = props
    const event_id = formData.id
    const [bookings, setBookings] = useState([])
    const [artists, setArtists] = useState([])
    const [input, setInput] = useState([])
    console.log("this event id is:", formData.id)
    const producer_id = formData.artist_id
    console.log("this event producer is:", formData.artist_id)
    //Get Artists
    useEffect(() => {
        axios
            .get(`http://https://stagelyt-mysql.herokuapp.com/pages/category/artist`)
            .then((res) => {
                console.log(res.data);
                setArtists(res.data);
            })
            .catch(err => {
                console.log("catch error: " + err)
            })
    }, []);

    //Submit a new booking
    const submitHandler = (e) => {
        axios
            .post(`http://https://stagelyt-mysql.herokuapp.com/api/bookings`, ({ data: input, event_id: event_id, producer_id: producer_id, artist_status: "pending", producer_status: "draft" }))
            .then((res) => {
                console.log(res.data);
                updateBookings()
                setInput([])            })
            .catch(err => {
                console.log("catch error: " + err)
            })
    }

    //pull bookings
    useEffect(() => {
        axios
            .get(`http://https://stagelyt-mysql.herokuapp.com/api/bookings/events/${event_id}`)
            .then((res) => {
                console.log("bookings are", res.data);
                setBookings(res.data);
            })
            .catch(err => {
                console.log("catch error: " + err)
            })
    }, []);

    //to update bookings post submit
    const updateBookings = () => {
        axios
            .get(`http://https://stagelyt-mysql.herokuapp.com/api/bookings/events/${event_id}`)
            .then((res) => {
                console.log("bookings are", res.data);
                setBookings(res.data);
            })
            .catch(err => {
                console.log("catch error: " + err)
            })
    }

    const removeBooking = (id) => {
        axios.delete(`http://https://stagelyt-mysql.herokuapp.com/api/bookings/${id}/`)
            .then((res) => {
                console.log(res);
                updateBookings()
            })

    }

    //change input
    const inputChange = (e) => {
        let newStateObject = { ...input };
        newStateObject[e.target.name] = e.target.value;
        setInput(newStateObject);
        console.log("new data", input);
    };

    return (
        <div className="form-body-tabbed">
            <div className="form-section mb-3">
                <form onSubmit={submitHandler}>
                    <div className="container mb-3">
                        <h3 className="form-header">Cast</h3>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label>Artist</label>
                                            <select
                                                className="form-select "
                                                name="page_id"
                                                onChange={(e) => inputChange(e)}
                                                searchable="Find Artists"
                                            >
                                                <option value={null} selected>Select Artist</option>
                                                {artists.length > 0 && artists.map((artist, idx) => {
                                                    return (
                                                        <option value={artist.id} key={idx}>{artist.name}</option>
                                                    )
                                                })}
                                                <option value="other">Other</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label>Type</label>
                                            <select
                                                className="form-select "
                                                name="type"
                                                onChange={(e) => inputChange(e)}
                                                searchable="Find Artists"
                                            >
                                                <option selected>Select Type</option>
                                                <option value="Cast">Cast</option>
                                                <option value="Crew">Crew</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label>Role</label>
                                            <input
                                                className=" form-control"
                                                type="text"
                                                placeholder="Role"
                                                name="role"
                                                value={input.role}
                                                onChange={(e) => { inputChange(e) }}

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label>Pay</label>
                                            <div className="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">$</span>
                                                </div>
                                                <input
                                                    className=" form-control" 
                                                    type="number"
                                                    placeholder="Pay"
                                                    name="pay"
                                                    value={input.pay}
                                                    onChange={(e) => { inputChange(e) }}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label>Acts</label>
                                            <input
                                                className=" form-control"
                                                type="text"
                                                placeholder="Acts"
                                                name="acts"
                                                value={input.acts}
                                                onChange={(e) => { inputChange(e) }}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div className="mb-3">
                                            <label>Pay Details</label>
                                            <input
                                                className=" form-control"
                                                type="text"
                                                placeholder="Pay Details"
                                                name="payDetails"
                                                value={input.payDetails}
                                                onChange={(e) => { inputChange(e) }}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-1 form-button-container">
                                        <div className="mb-3">
                                            <button className="btn" onClick={(e) => { e.preventDefault(); submitHandler(e) }}>Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Role</th>
                                <th>Artist Status</th>
                                <th>Status</th>
                                <th>Pay</th>
                                <th>Acts</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>

                        {bookings && bookings.map((booking) => {
                            return (
                                <BookingLine data={booking} removeBooking={removeBooking} updateBookings={updateBookings} />
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EventsCast;
