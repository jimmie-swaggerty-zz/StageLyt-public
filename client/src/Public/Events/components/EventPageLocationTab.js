import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EventPageLocationTab = (props) => {
    const { id } = props
    const [venue, setVenue] = useState({})
    useEffect(() => {
        axios.get(`http://https://stagelyt-mysql.herokuapp.com/api/pages/${props.id}`)
            .then((res) => {
                console.log(res)
                setVenue(res.data)
            })
            .catch((err) => {
                console.log("catch error: ", err);
            });
    }, [props.id]);
    return (
        <div>
            <h5 className="card-title">Address</h5>
            <p className="card-text">
                {venue.address}
            <br/>{venue.city}, {venue.state} {venue.zipcode}
            </p>
        </div>
    )
}

export default EventPageLocationTab