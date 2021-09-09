import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ImageDisplayS3 from '../../Other/components/Images/ImageDisplayS3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Slider from '../../Other/components/Slider'
import EventCard from '../../Events/components/EventCard'

const VenuePage = (props) => {
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
        <div className="mt-4 container">
            <div className="card mt-3">
                <div className="col-4">
                    <ImageDisplayS3 imageURL={data.profileImg_id}/>
                </div>

            </div>
            {events &&
                <Slider title="Events">
                    {events.map((event) => {
                        return (
                            <EventCard event_id={event.id} />
                        )
                    })}
                </Slider>
            }

        </div>
    )
}

export default VenuePage