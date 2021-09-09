import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ImageDisplayS3 from '../../Other/components/Images/ImageDisplayS3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Slider from '../../Other/components/Slider'
import EventCard from '../../Events/components/EventCard'
import ArtistSquare from '../../Artists/components/ArtistSlider/ArtistSquare'
import PageCard from '../../../Dashboard/Pages/components/PageCard'
import { faBuilding, faMapMarkerAlt, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import Header from '../../Other/components/Header'


const City = (props) => {
    const [data, setData] = useState([])
    const [events, setEvents] = useState([])
    const [pages, setPages] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`process.env.REACT_APP_URL:8080/api/cities/${id}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
    }, [id])
    useEffect(() => {
        axios.get(`process.env.REACT_APP_URL:8080/api/pages/bycity/${id}`)
            .then((res) => {
                console.log("pages are", res.data)
                setPages(res.data)
            })
    }, [id])

    useEffect(() => {
        axios.get(`process.env.REACT_APP_URL:8080/api/events`)
            .then((res) => {
                console.log(res.data)
                setEvents(res.data)

            })
    }, [id])

    const venues = pages.filter(page=> page.type=="venue")
    const artists = pages.filter(page=> page.type=="artist")


    return (
        <div className="container profile-wrapper mt-3">
            <div className="card">
                <ImageDisplayS3 imageRatioType="banner" imageURL={data.bannerImg_id} className="card-img-top" />
                <div className="card-header justify-content-around d-flex flex-row">
                    <div className="col-lg-2 col-md-3">
                        <ImageDisplayS3 imageRatioType="square profile-img circle" imageURL={data.profileImg_id} />
                    </div>
                    <div className="col-6 text-start">
                        <div className="card-body">
                            <h3 className="card-title">{data.name}</h3>
                            <p className="card-text">@{id}</p>
                            <div className="row">
                                {data.instagram &&
                                    <div className="col-1">
                                        <a href={`instagram.com/${data.instagram}`} className="icon"><FontAwesomeIcon icon={faInstagram} /></a>
                                    </div>
                                }
                                {data.facebook &&
                                    <div className="col-1">
                                        <a href={`facebook.com/${data.facebook}`} className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
                                    </div>
                                }
                                {data.twitter &&
                                    <div className="col-1">
                                        <a href={`twitter.com/${data.twitter}`} className="icon"><FontAwesomeIcon icon={faTwitter} /></a>
                                    </div>
                                }
                                {data.tiktok &&
                                    <div className="col-1">
                                        <a href={`tiktok.com/${data.tiktok}`} className="icon"><FontAwesomeIcon icon={faTiktok} /></a>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-4 card-body">
                        <p className="card-title">Venues: {venues.length}</p>
                        <p className="card-title">Upcoming Events: {events.length}</p>
                    </div>
                </div>

                <Header title="About" />
                <div className="card-body">
                    <p className="card-text p-4">{data.summary}</p>
                </div>
                <div className="" id="events">
                    <Slider divid="events" childstyle="col-6" title={`Upcoming Events in ${data.name}`} banner="true" icon={faTicketAlt} expandable={true} exState={true}>
                        {events && events.map((event) => {
                            return (
                                <EventCard event_id={event.id} />
                            )
                        }
                        )}

                    </Slider>
                </div>
                {venues && <div className="" id="venues">
                    <Slider childstyle="col-4" divid="venues" banner="true" title={`Venues in ${data.name}`} icon={faMapMarkerAlt} expandable={true} exState={false}>
                        {venues && venues.map((venue) => {
                            console.log("this artist is:", venue)
                            return (
                                <PageCard page_id={venue.id} />
                            )
                        }
                        )}

                    </Slider>
                </div>}
                {artists && <div className="" id="artists">
                    <Slider childstyle="col-4" divid="artists" banner="true" title={`Artists from ${data.name}`} icon={faMapMarkerAlt} expandable={true} exState={false}>
                        {artists && artists.map((venue) => {
                            console.log("this artist is:", venue)
                            return (
                                <PageCard page_id={venue.id} />
                            )
                        }
                        )}

                    </Slider>
                </div>}
            </div>
        </div>
    )
}

export default City