import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import Moment from 'moment'
import ImageDisplayS3 from '../../Other/components/Images/ImageDisplayS3'
import ProducerLink from '../components/ProducerLink';
import VenueLink from '../components/VenueLink';
import EventPageLocationTab from '../components/EventPageLocationTab';
import EventPageCast from '../components/EventPageCast';
import Header from '../../Other/components/Header';
const EventPage = (props) => {
    const [event, setEvent] = useState({})
    const { id } = useParams()
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.log("event", res.data);
                setEvent(res.data);
            })
            .catch((err) => {
                console.log("catch error: ", err);
            });
    }, []);

    return (
        <div>
            <div className="container profile-wrapper mt-3 mb-3">
                <div className="card">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            {event && <ImageDisplayS3 imageURL={event.bannerImg_id} imageRatioType="banner" className="card-img-top" />}
                        </div>
                        <div className="col-lg-6 col-12 mt-2 text-center justify-content-around card-body">
                            <h3 class="card-title">{event.name}</h3>
                            <p class="card-text mb-2">by <ProducerLink id={event.artist_id} /></p>
                            <h6 className="card-title mb-2">{Moment(event.start).format("LLLL")} - {Moment(event.end).format("hh:mm A")}</h6>
                            <p className="card-text mb-4">at <VenueLink id={event.venue_id} /></p>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                    {/* 
                    <div className="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button
                                    class="nav-link active"
                                    id="info-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#info"
                                    type="button"
                                    role="tab"
                                    aria-controls="info"
                                    aria-selected="true"
                                >
                                    Info
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button
                                    class="nav-link"
                                    id="location-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#location"
                                    type="button"
                                    role="tab"
                                    aria-controls="location"
                                    aria-selected="false"
                                >
                                    Location
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button
                                    class="nav-link"
                                    id="cast-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#cast"
                                    type="button"
                                    role="tab"
                                    aria-controls="cast"
                                    aria-selected="false"
                                >
                                    Cast
                                </button>
                            </li>
                        </ul>
                    </div> */}

                    <div>
                        <Header title="About" />
                        <div className="card-body p-4">
                            <p class="card-text">{event.description || `There is currently no description for ${event.name}`}</p>
                            {/* <EventPageLocationTab id={event.venue_id} /> */}
                        </div>
                    </div>
                    <EventPageCast id={event.id} />
                </div>
            </div>
        </div>
    )
}

export default EventPage