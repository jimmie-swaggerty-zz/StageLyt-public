import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import EventPage from "./views/EventPage";
import UpcomingEvents from "./views/UpcomingEvents";


const Events = (props) => {
    //routing constants
    const { path, url } = useRouteMatch()
    return (
        <div className="container-flex">
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