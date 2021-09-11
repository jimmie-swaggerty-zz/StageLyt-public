import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ImageDisplayS3 from '../Other/components/Images/ImageDisplayS3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Slider from '../Other/components/Slider'
import EventCard from '../Events/components/EventCard'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import Header from '../Other/components/Header'

const Page = (props) => {
    const [data, setData] = useState([])
    const [events, setEvents] = useState([])
    const [type, setType] = useState("")
    const { id } = useParams()
    const defaultBanner =""

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pages/${id}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setType(res.data.type)
            })
    }, [id])

    useEffect(() => {
        if (type !== "venue") {
            axios.get(`http://localhost:8080/api/bookings/bypage/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setEvents(res.data)
                })
        }
        else {
            axios.get(`http://localhost:8080/api/events/byvenue/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setEvents(res.data)
                })
        }
    }, [type])


    return (
        <div className="container mt-3 mb-3 profile-wrapper">
            <div class="card">
                <ImageDisplayS3 imageRatioType="banner" imageURL={data.bannerImg_id || defaultBanner} className="card-img-top" />
                <div className="card-header justify-content-around d-flex flex-row">
                    <div className="col-lg-2 col-md-3">
                        <ImageDisplayS3 imageRatioType="square profile-img circle" imageURL={data.profileImg_id || defaultBanner} />
                    </div>
                    <div className="col-6 text-start">
                        <div className="card-body">
                            <h3 className="card-title">{data.name}</h3>
                            <p className="card-text">@{data.slug}</p>
                            <div className="row">
                                {data.instagram &&
                                    <div className="col-1">
                                        <a href={`https://instagram.com/${data.instagram}`} className="icon" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                                    </div>
                                }
                                {data.facebook &&
                                    <div className="col-1">
                                        <a href={`https://facebook.com/${data.facebook}`} className="icon" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
                                    </div>
                                }
                                {data.twitter &&
                                    <div className="col-1">
                                        <a href={`https://twitter.com/${data.twitter}`} className="icon" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
                                    </div>
                                }
                                {data.tiktok &&
                                    <div className="col-1">
                                        <a href={`https://tiktok.com/${data.tiktok}`} className="icon" target="_blank"><FontAwesomeIcon icon={faTiktok} /></a>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {events.length > 0 && <div className="col-4 card-body">
                        <p className="card-title">Upcoming Events: {events.length}</p>
                    </div>}
                </div>

                {data.about &&
                    <div>
                        <Header title="About" className="card-body" />
                        <div className="p-4 card-body">
                            <p className="card-text">{data.about}</p>
                            {/* {data.address && <div className=" cardcol-4">
                        <h5 className="card-title">Address</h5>
                        <p className="card-text mb-2">
                            {data.address}
                            <br /><CityLink id={data.city_id} />
                        </p>
                    </div>} */}
                        </div>
                    </div>}
                <div className="" id="events">
                    {events.length > 0 &&
                        <div>
                            <Slider title="Events" childstyle="col-4" divid="events" title={`${data.name}'s Upcoming Events`} banner="true" expandable="true" exState={true} icon={faTicketAlt} bottomBorder={true}>
                                {events.map((event) => {
                                    console.log(event)
                                    const event_id = event.event_id || event.id
                                    return (
                                        <div>
                                            <EventCard event_id={event_id} />
                                        </div>
                                    )
                                }
                                )}

                            </Slider>
                        </div>}
                </div>
            </div>
        </div>
    )

}

export default Page