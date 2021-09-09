import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ImageDisplayS3 from '../../../Public/Other/components/Images/ImageDisplayS3'
import Moment from 'moment'
import Header from '../../../Public/Other/components/Header'

const BookingInfo = props => {
    const { booking_id } = useParams()
    const [booking, setBooking] = useState([])
    const [event, setEvent] = useState([])
    const [status, setStatus] = useState("pending")
    console.log(status)

    const updateStatus = (status) => {
        console.log(booking.id)
        console.log(status)
        axios.put(`http://localhost:8000/api/bookings/accept/${booking.id}`, { status: status })
            .then((res) => {
                console.log("booking info booking", res.data);
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                // setErrors(err.response.data.errors);
            })
    }
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/bookings/${booking_id}`)
            .then((res) => {
                console.log("booking", res.data);
                setBooking(res.data);
                setStatus(res.data.artist_status)
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, []);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/events/${booking.event_id}`)
            .then((res) => {
                console.log("event", res.data);
                setEvent(res.data);
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, [booking]);
    return (
        <div className="container mt-3 mb-3 profile-wrapper">
            <div className="card">
                <div className="">
                    <div className="card-img-top">
                        <ImageDisplayS3 imageURL={event.bannerImg_id} imageRatioType="banner" />
                    </div>
                    <Header title={event.name}/>
                    <div className="card-body">
                        <div className="container row mt-3">
                            <div className="col-5">
                                <label>Date</label>
                                <input type="text" className="form-control mb-3" disabled value={Moment(event.start).format("LLLL")} />
                            </div>
                            {booking.type && <div className="col-4">
                                <label>Booking type</label>
                                <input type="text" className="form-control mb-3" disabled value={booking.type + " - " + booking.role && booking.role} />
                            </div>}
                            <div className="col-2">
                                <label>Status</label>
                                <select value={status} className="form-select mb-3" name="artist_status" onChange={(e) => { e.preventDefault(); console.log(e.target.value); setStatus(e.target.value); updateStatus(e.target.value) }}>
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="declined">Declined</option>
                                </select>
                            </div>
                            {booking.acts &&
                                <div className="col-1">
                                    <label>Acts</label>
                                    <input type="text" className="form-control mb-3" disabled value={booking.acts} />
                                </div>
                            }
                            {booking.pay &&
                                <div className="col row">
                                    <div className="col-4">
                                        <label>Pay</label>
                                        <input type="text" className="form-control mb-3" disabled value={"$"+booking.pay} />
                                    </div>
                                    <div className="col-8">
                                        <label>Pay Info</label>
                                        <input type="text" className="form-control mb-3" disabled value={booking.payInfo} />
                                    </div>
                                </div>
                            }
                            {event.techInfo &&
                                <div className="col-12">
                                    <label>Tech</label>
                                    <textarea type="text" className="form-control mb-3" disabled value={event.techInfo} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default BookingInfo