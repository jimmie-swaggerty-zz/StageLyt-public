import React, { useEffect, useState } from "react";
import { Route, Link, NavLink, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faHome, faPalette, faCity, faTicketAlt, faStar, faSignInAlt, faSignOutAlt, faUpload, faBook, faMapMarker, faMapMarkerAlt, faAddressCard, faWallet } from '@fortawesome/free-solid-svg-icons'

const DashboardNavBar = (props) => {
    const { path, url } = useRouteMatch();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <ul className="navbar-nav w-100 justify-content-around d-flex flex-row">
                    <li className="nav-item text-center">
                        <NavLink className="nav-link text-center" to={`${url}/pages`}>
                            <FontAwesomeIcon icon={faAddressCard} className="fa-2x" />
                            {/* <p className="text-center">Venues</p> */}
                            <br />My Pages
                        </NavLink>
                    </li>
                    <li className="nav-item text-center">
                        <NavLink className="nav-link text-center" to={`${url}/events`}>
                            <FontAwesomeIcon icon={faTicketAlt} className="fa-2x" />
                            {/* <p className="text-center">Events</p> */}
                            <br />My Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link text-center" to={`${url}/bookings`}>
                            <FontAwesomeIcon icon={faBook} className="fa-2x" />
                            {/* <p className="text-center">Producers</p> */}
                            <br />My Bookings
                        </NavLink>
                    </li>
                    {/* <li className="nav-item text-center">
                        <NavLink className="nav-link" exact to={`${url}/settings`}>
                            <FontAwesomeIcon icon={faSlidersH} className="fa-2x" />
                            <br />Profile Settings
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default DashboardNavBar;
