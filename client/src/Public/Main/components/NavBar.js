import React, { useEffect, useState, useContext } from "react";
import { store } from '../../../context/StateProvider'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faHome, faPalette, faCity, faTicketAlt, faStar, faSignInAlt, faSignOutAlt, faUpload, faUserCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import logo from '../../../Images/icononly.png'
import { GoogleLogin, GoogleLogout } from "react-google-login";
const NavBar = (props) => {
    const globalStateAndDispatch = useContext(store)
    const globalState = globalStateAndDispatch.state
    const globalDispatch = globalStateAndDispatch.dispatch
    const clientId = process.env.REACT_APP_CLIENT_ID

    const success = async response => {
        const res = await fetch("https://stagelyt-mysql.herokuapp.com/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: response.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
        // store returned user somehow

        globalDispatch({
            type: "sign-in",
            payload: data
        })
    }

    const error = response => {
        console.error(response) // eslint-disable-line
    }

    const loading = () => {
        console.log('loading') // eslint-disable-line
    }

    const logout = () => {
        console.log('logout') // eslint-disable-line
        globalDispatch({
            type: "sign-out"
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-purple">
            <div className="container">
                <a className="navbar-brand col-lg-1 col-7 p-3"><img src={logo} width="100" alt="" /></a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav w-100 justify-content-around d-flex flex-row">
                        <li className="nav-item text-center">
                            <NavLink className="nav-link" exact to="/">
                                <FontAwesomeIcon icon={faHome} className="fa-2x" />
                                <br />Home
                            </NavLink>
                        </li>
                        <li className="nav-item text-center">
                            <NavLink className="nav-link text-center" to="/venues">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-2x" />
                                {/* <p className="text-center">Venues</p> */}
                                <br />Venues
                            </NavLink>
                        </li>
                        <li className="nav-item text-center">
                            <NavLink className="nav-link" to="/artists">
                                <FontAwesomeIcon icon={faPalette} className="fa-2x" />
                                {/* <p className="text-center">Artists</p> */}
                                <br />Artists
                            </NavLink>
                        </li>
                        <li className="nav-item text-center">
                            <NavLink className="nav-link" to="/events">
                                <FontAwesomeIcon icon={faTicketAlt} className="fa-2x" />
                                {/* <p className="text-center">Events</p> */}
                                <br />Events
                            </NavLink>
                        </li>
                        <li className="nav-item text-center">
                            <NavLink className="nav-link text-center" to="/producers">
                                <FontAwesomeIcon icon={faStar} className="fa-2x" />
                                {/* <p className="text-center">Producers</p> */}
                                <br />Producers
                            </NavLink>
                        </li>
                        <li className="nav-item text-center">
                            <NavLink className="nav-link text-center" to="/cities">
                                <FontAwesomeIcon icon={faCity} className="fa-2x" />
                                {/* <p className="text-center">Producers</p> */}
                                <br />Cities
                            </NavLink>
                        </li>
                        {globalState.user.loggedIn && <li className="nav-item text-center">
                            <NavLink className="nav-link text-center" to="/dashboard">
                                <FontAwesomeIcon icon={faSlidersH} className="fa-2x" />
                                {/* <p className="text-center">Producers</p> */}
                                <br />Dashboard
                            </NavLink>
                        </li>}
                        {globalState.user.loggedIn &&
                            <li className="nav-item text-center">
                                <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={logout} render={renderProps => (

                                    <div className="nav-link text-center" type="button" to="/sign-in" onClick={renderProps.onClick}>
                                        <FontAwesomeIcon icon={faSignOutAlt} className="fa-2x" />
                                        {/* <p className="text-center">Dashboard</p> */}
                                        <br />Sign Out

                                    </div>

                                )} />
                            </li>

                        }
                        {!globalState.user.loggedIn && <GoogleLogin onSuccess={success} onFailure={error} clientId={clientId} isSignedIn={false} render={renderProps => (
                            <li>
                                <div className="nav-link text-center" type="button" onClick={renderProps.onClick} >
                                    <FontAwesomeIcon icon={faSignInAlt} className="fa-2x" />
                                    <br />Sign In
                                </div>
                            </li>)} />
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
