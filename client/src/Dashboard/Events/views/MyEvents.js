import React, { useContext, useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../../context/StateProvider'

import axios from 'axios'
import Slider from '../../../Public/Other/components/Slider'
import EventCard from '../../../Public/Events/components/EventCard'


const MyEvents = (props) => {
        //routing constants
        const { path, url } = useRouteMatch()
        const [events, setEvents] = useState()
        const globalStateAndDispatch = useContext(store)
        const globalState = globalStateAndDispatch.state
        const globalDispatch = globalStateAndDispatch.dispatch
        
        useEffect(()=>{
            axios.get('http://https://stagelyt-mysql.herokuapp.com/api/events/').then((res) => {
                console.log(res.data);
                setEvents(res.data);
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, []);
    return (
        <div className="container-fluid m-3">
            <div className="row">
                <div className="col-12" id="myevents">
                    <Slider title="My Events" icon={faTicketAlt} divid="myevents" childstyle="col-lg-3 col-md-6 col-12" banner="true" bottomBorder={true}>
                        {events && events.map((event)=>{
                            return(
                                <EventCard event_id={event.id} type="dashboard"/>
                            )
                        })}

                    </Slider>
                </div>

            </div>
                <div className="d-flex justify-content-around">
                <Link to={`${path}new`} className="btn w-50 m-3">Add Event</Link>
                </div>
        </div>
    )
}

export default MyEvents