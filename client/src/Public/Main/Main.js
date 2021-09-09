import React, { useState, useEffect } from 'react'
import Banner from "../Main/components/Banner"
import Slider from '../Other/components/Slider'
import axios from 'axios'
import EventCard from '../Events/components/EventCard'
import {faTicketAlt} from '@fortawesome/free-solid-svg-icons'


const Main = (props) => {

    const [events, setEvents] = useState([])
    const [loaded, setLoaded] = useState(false)
    console.log(process.env.REACT_APP_URL)
    //pull events
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}:8080/api/events`)
            .then((res) => {
                console.log("res data get events", res.data);
                setEvents(res.data)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className="m-3">
            {/* <Banner /> */}
            <div id="events">
                {loaded && <Slider title="Upcoming Events" divid="events" childstyle="col-lg-3 col-md-4 col-12" banner={true} bottomBorder={true} icon={faTicketAlt} exState={true}>
                    {events.length>0 && events.map((event, idx) => {
                        return (
                            <EventCard event_id={event.id} />
                        )
                    })
                    }
                </Slider>}
                {events.length < 1 && <h2 className="w-100 text-center">There are currently no events available</h2>}
            </div>
        </div>
    )
}

export default Main