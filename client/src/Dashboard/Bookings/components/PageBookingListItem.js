import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faInfo } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment'
import { useHistory } from "react-router-dom";


const PageBookingListItem = (props) => {
    //Allows link navigation
    let history = useHistory()
    const { page_id, booking_id, updateStatus} = props
    const [booking, setBooking] = useState([])
    const [event, setEvent] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        axios
            .get(`process.env.REACT_APP_URL:8080/api/bookings/${booking_id}`)
            .then((res) => {
                console.log("booking", res.data);
                setBooking(res.data);
                setLoaded(true)
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, []);

    const acceptGig = (status) => {
        console.log(booking.id)
        console.log(status)
        axios.put(`process.env.REACT_APP_URL:8080/api/bookings/accept/${booking.id}`, { status: status })
            .then((res) => {
                console.log("booking info booking", res.data);
                updateBooking()
                updateStatus()
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                // setErrors(err.response.data.errors);
            })
    }

    useEffect(() => {
        axios
            .get(`process.env.REACT_APP_URL:8080/api/events/${booking.event_id}`)
            .then((res) => {
                console.log("event", res.data);
                setEvent(res.data);
                setLoaded(true)
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, [booking])
    
const updateBooking = () => {
    axios
    .get(`process.env.REACT_APP_URL:8080/api/bookings/${booking_id}`)
    .then((res) => {
        console.log("booking", res.data);
        setBooking(res.data);
        setLoaded(true)
    })
    .catch((err) => {
        console.log("catch error: " + err);
    });
}

    return (
        <div className="row text-wrap">
            {loaded && <div className="col-10">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{Moment(event.start).format("LLLL")}</p>
            </div>}
            <div className="col-2">
                {booking.artist_status === "pending" && <button className="btn w-100 text-center p-1 m-1" onClick={(e) => { e.preventDefault(); acceptGig("accepted") }}><FontAwesomeIcon icon={faCheck} /></button>}
                <button className="btn w-100 p-1 m-1" onClick={(e) => { e.preventDefault(); history.push(`/dashboard/bookings/info/${booking.id}`) }}><FontAwesomeIcon icon={faInfo} /></button>
            </div>
        </div>
    )
}

export default PageBookingListItem