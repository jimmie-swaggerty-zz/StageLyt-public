import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import EventPage from "./views/EventPage";
import UpcomingEvents from "./views/UpcomingEvents";


const Events = (props) => {
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
                    <UpcomingEvents />
                </Route>
                <Route path={`${path}/:id`}>
                    <EventPage/>
                </Route>
            </Switch>
        </div>
    )
}

export default Events