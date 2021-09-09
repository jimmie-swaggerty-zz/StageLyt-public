import React, { useEffect, useContext, useState } from 'react'
import MyBookings from './views/MyBookings'
import { Route, Switch, useRouteMatch } from 'react-router'
import BookingInfo from './views/BookingInfo'

const Bookings = () => {

        //routing constants
        const { path, url } = useRouteMatch()

    return (
        <div className="container-flex">
            {/* <div className="row bg-purple dashboard-section-banner mb-3">
                <div className="col-12">
                    <h3 className="">
                        <FontAwesomeIcon icon={faPalette} className="fa-1x" />
                        My Pages
                    </h3>
                </div>
            </div> */}
            <Switch>
                <Route exact path={`${path}/`}>
                    <MyBookings />
                </Route>
                <Route path={`${path}/info/:booking_id`}>
                    <BookingInfo/>
                </Route>
            </Switch>
        </div>
    )
}

export default Bookings