import React, { useState, useEffect } from 'react';
import axios from 'axios'
import PageBookingListItem from '../components/PageBookingListItem';
import ImageDisplayS3 from '../../../Public/Other/components/Images/ImageDisplayS3';
import Moment from "moment";

const PageBookingList = (props) => {
    const { page_id } = props;
    const [bookingList, setBookingList] = useState([])
    const [page, setPage] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [expand, setExpand] = useState(false)

    const updateStatus = () => {
        axios
            .get(`process.env.REACT_APP_URL:8080/api/bookings/bypage/${page_id}`)
            .then((res) => {
                // console.log("bookings by page", res.data);
                setBookingList(res.data);
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }
    useEffect(() => {
        updateStatus()
    }, []);

    //get page info
    useEffect(() => {
        axios
            .get(`process.env.REACT_APP_URL:8080/api/pages/${page_id}`)
            .then((res) => {
                // console.log("page", res.data);
                setPage(res.data);
                setLoaded(true)
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, []);

    const toggleExpand = () => {
        if (expand) {
            setExpand(false)
        }
        else {
            setExpand(true)
        }
    }

    const pending = bookingList.filter(booking => booking.artist_status === "pending")
    const accepted = bookingList.filter(booking => booking.artist_status === "accepted")
    const declined = bookingList.filter(booking => booking.artist_status === "declined")

    return (
        <div class="text-center">
            {loaded && <div class="card text-center">
                <ImageDisplayS3 imageURL={page.profileImg_id} imageRatioType="square" className="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">{page.name}</h5>
                    {bookingList.length <= 0 && <h6 className="card-text p-2">No Current Bookings</h6> || <h6 className="card-text bg-purple p-2" type="button" onClick={toggleExpand}>You have <span className="pill-b">{bookingList.length}</span> bookings</h6>}
                </div>
                {expand &&
                    <div>
                        {pending.length > 0 && <div>
                            <div class="card-header">
                                Pending
                            </div>
                            <ul class="list-group list-group-flush">
                                {pending.map((booking, idx) => {
                                    console.log("BL Booking", booking)
                                    return (
                                        <li class="list-group-item"><PageBookingListItem page_id={booking.artist_id} booking_id={booking.id} updateStatus={updateStatus}/></li>
                                    )
                                })
                                }
                            </ul>
                        </div>}
                        {accepted.length > 0 && <div>
                            <div class="card-header">
                                Accepted
                            </div>
                            <ul class="list-group list-group-flush">
                                {accepted.map((booking, idx) => {
                                    console.log("BL Booking", booking)
                                    return (
                                        <li class="list-group-item"><PageBookingListItem page_id={booking.artist_id} booking_id={booking.id}  updateStatus={updateStatus} /></li>
                                    )
                                })
                                }
                            </ul>
                        </div>}
                        {declined.length > 0 && <div>
                            <div class="card-header">
                                Declined
                            </div>
                            <ul class="list-group list-group-flush">
                                {declined.map((booking, idx) => {
                                    console.log("BL Booking", booking)
                                    return (
                                        <li class="list-group-item"><PageBookingListItem page_id={booking.artist_id} booking_id={booking.id}  updateStatus={updateStatus} /></li>
                                    )
                                })
                                }
                            </ul>
                        </div>}
                    </div>}
            </div>}
        </div>
    )
}

export default PageBookingList