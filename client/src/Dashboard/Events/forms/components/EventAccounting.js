import React, { useState, useEffect } from "react";
import axios from 'axios'
import BookingLine from "./BookingLine";
const EventAccounting = (props) => {
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
            .get(`https://stagelyt-mysql.herokuapp.com/pages/category/artist`)
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
            .post(`https://stagelyt-mysql.herokuapp.com/api/bookings`, ({ data: input, event_id: event_id, producer_id: producer_id, artist_status: "pending", producer_status: "draft" }))
            .then((res) => {
                console.log(res.data);
                updateBookings()
            })
            .catch(err => {
                console.log("catch error: " + err)
            })
    }

    //pull bookings
    useEffect(() => {
        axios
            .get(`https://stagelyt-mysql.herokuapp.com/api/bookings/events/${event_id}`)
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
        .get(`https://stagelyt-mysql.herokuapp.com/api/bookings/events/${event_id}`)
        .then((res) => {
            console.log("bookings are", res.data);
            setBookings(res.data);
        })
        .catch(err => {
            console.log("catch error: " + err)
        })
    }

    const removeBooking = (id) => {
        axios.delete(`https://stagelyt-mysql.herokuapp.com/api/bookings/${id}/`)
        .then((res)=>{
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

        </div>
    );
};

export default EventAccounting;
