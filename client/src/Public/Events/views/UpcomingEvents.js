import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../../Other/components/Slider";
import EventCard from "../components/EventCard";
import { faCalendarAlt, faTicketAlt } from "@fortawesome/free-solid-svg-icons";

const UpcomingEvents = (props) => {
    const [events, setEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);
    // const {myPokes} = props
    useEffect(() => {
        axios
            .get(`process.env.REACT_APP_URL:8080/api/events`)
            .then((res) => {
                console.log(res.data);
                setEvents(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log("catch error: " + err)
            })
    }, []);
    return (
        <div className="container-flex m-3">
            <div id="eventsfollowed">
                <Slider title="Events You Follow" divid="eventsfollowed" childstyle="col-lg-3 col-md-4 col-12" banner={true} expandable={true} exState={true} icon={faTicketAlt}>
                    {events && events.map((event) => {
                        return (
                            <EventCard event_id={event.id} />
                        )
                    })}
                </Slider>
            </div>
            <div id="allevents">
                <Slider title="All Events" divid="allevents" childstyle="col-lg-3 col-md-4 col-12" banner={true} expandable={true} exState={true} icon={faTicketAlt}  bottomBorder={true}>
                    {events && events.map((event) => {
                        return (
                            <EventCard event_id={event.id} />
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default UpcomingEvents