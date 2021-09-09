import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ImageDisplayS3 from '../../Other/components/Images/ImageDisplayS3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Slider from '../../Other/components/Slider'
import EventCard from '../../Events/components/EventCard'

const ProducerPage = (props) => {
    const [data, setData] = useState([])
    const [events, setEvents] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pages/${id}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
    }, [id])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/events/byprofile/${id}`)
            .then((res) => {
                console.log(res.data)
                setEvents(res.data)
            })
    }, [id])

    return (
        <div className="container card mt-4">
            <div className="row">
                <div className="col-8 banner image-display" style={{ backgroundImage: `url(${data.bannerImg_id})` }}>
                    <div className="row">
                        <div className="col-3 mt-2">
                            <ImageDisplayS3 imageURL={data.profileImg_id} imageRatioType="square" className="card-img-top" />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <h5 className="card-title text-center mt-3">{data.name}</h5>
                    <div className="card-header">
                        <h5 className="card-title">About</h5>
                    </div>
                    <div className="card-body">

                        <p className="card-text">{data.about}</p>
                    </div>
                    <div className="card-header">
                        <h5 className="card-title">Social</h5>
                    </div>
                    <div className="card-body justify-content-around d-flex flex-row">
                        {data.instagram &&
                            <a href={`instagram.com/${data.instagram}`} className="icon"><FontAwesomeIcon icon={faInstagram} className="fa-2x" /></a>
                        }
                        {data.facebook &&
                            <a href={`facebook.com/${data.facebook}`} className="icon"><FontAwesomeIcon icon={faFacebookF} className="fa-2x" /></a>
                        }
                        {data.twitter &&
                            <a href={`twitter.com/${data.twitter}`} className="icon"><FontAwesomeIcon icon={faTwitter} className="fa-2x" /></a>
                        }
                        {data.tiktok &&
                            <a href={`tiktok.com/${data.tiktok}`} className="icon"><FontAwesomeIcon icon={faTiktok} className="fa-2x" /></a>
                        }
                    </div>
                    {data.type = "venue" &&
                        <div>
                            <div className="card-header">
                                <h5 className="card-title">Location</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    {data.address}
                                    <br />{data.city}, {data.state} {data.zipcode}
                                </p>
                            </div>
                            <div className="card-header">
                                <h5 className="card-title">Hours</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    hours will go here
                                </p>
                            </div>
                        </div>
                    }
                </div>

            </div>
{events &&
<Slider title="Events">
{events.map((event)=>{
    return(
        <EventCard event_id={event.id}/>
    )
})}
</Slider>
}
        </div>
    )
}

export default ProducerPage