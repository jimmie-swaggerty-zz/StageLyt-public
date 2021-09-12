import React, { useContext, useState, useEffect } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import axios from 'axios'
import ImageDisplayS3 from "../../Other/components/Images/ImageDisplayS3"
import Moment from 'moment'

const EventCard = (props) => {
    //producer_id from parent
    const { event_id, type} = props;
    console.log("this events id is", event_id)
    //producer display data
    const [event, setEvent] = useState([])
    const [loaded, setLoaded] = useState(false)
    let history = useHistory()

    //pull producer profiles
    useEffect(() => {
        axios.get(`http://https://stagelyt-mysql.herokuapp.com/api/events/${event_id}`)
            .then((res) => {
                console.log("res data get producers", res.data);
                setEvent(res.data)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const { path, url } = useRouteMatch();

    return (
        <div class="card">
           <ImageDisplayS3 className="card-img-top" imageURL={event.bannerImg_id} alt={event.name} imageRatioType="banner" onClick={(e)=>{e.preventDefault(); history.push(`/events/${event.id}`)}}/>
            {event && <div class="card-body text-center">
                <h6 class="card-title">{event.name}</h6>
                <p class="card-text">{Moment(event.start).format("LLLL")} - {Moment(event.end).format("hh:mm A")}</p>
            </div>}
            <div className="card-body">
            {type==="dashboard" && <a href={`/dashboard/events/update/${event.id}`} className="btn align-text-bottom w-50">Update</a>}
            <a href={`/events/${event.id}`} className="btn align-text-bottom w-50">View</a>
            </div>
        </div>
    )
}

export default EventCard