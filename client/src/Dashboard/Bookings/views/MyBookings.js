import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { store } from '../../../context/StateProvider'
import Slider from '../../../Public/Other/components/Slider'
import PageBookingList from './PageBookingList'
import { faBook } from '@fortawesome/free-solid-svg-icons'

const MyBookings = () => {
    //Context state
    const globalStateAndDispatch = useContext(store)
    const globalState = globalStateAndDispatch.state
    console.log(globalState)
    const user_id = globalState.user.id

    const [pages, setPages] = useState([])
    const [loaded, setLoaded] = useState(false)

    //get pages owned
    useEffect(() => {
        axios.get(`http://localhost:8080/api/pages/mypages/${user_id}`)
            .then((res) => {
                console.log(res.data)
                setPages(res.data)
                setLoaded(true)
            })
    }, [user_id])

    const artists = pages.filter(page => page.type == "artist")

    return (
        <div className="m-3">
            <div className="container-flex" id="artistbookings">
                <Slider title="My Bookings" childstyle="col-lg-3 col-md- col-12" divid="artistbookings" banner="true" icon={faBook} counterhide={true} bottomBorder={true}  bottomBorder={true}>
                    {artists && artists.filter(page => page.type == "artist").map((page) => {
                        return (
                            <div>
                                <PageBookingList page_id={page.id} className="card" />
                            </div>
                        )
                    }
                    )}
                </Slider>
            </div>
        </div>


    )
}

export default MyBookings