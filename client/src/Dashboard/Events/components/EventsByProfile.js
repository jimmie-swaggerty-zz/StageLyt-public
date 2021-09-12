import React, {useEffect, useState} from 'react'
import axios from 'axios'

const EventsByProfile = (props) => {
    const {profile} = props
    const [artist, setArtist] = useState();
    const [events, setEvents] = useState()
    console.log("Events by profile profile:", profile)
    useEffect(() => {
        axios
            .get(`http://https://stagelyt-mysql.herokuapp.com/events/byprofile/${profile.id}`)
            .then((res) => {
                console.log(res.data);
                setEvents(res.data);
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, [profile.id]);
    useEffect(() => {
        axios
            .get(`http://https://stagelyt-mysql.herokuapp.com/artists/${profile.id}`)
            .then((res) => {
                console.log("artist request",res.data);
                setArtist(res.data);
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, [profile.id]);
    return(
        <div className="container">
            <h5>Events for {artist ? artist.name : "Artist"}</h5>
            {profile.slug}
            {profile.id}
            {events && events.map((event)=>{
                {event.name}
            })}
        </div>
    )
}

export default EventsByProfile