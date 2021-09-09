import React, { useState } from "react";

import "./Styling/App.css";
import "./Styling/Slider.css";
import "./Styling/events.css";

//This allows for active tabs to be selected and is a great router node.js
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//This provides us with context
import StateProvider from "./context/StateProvider";

//This is our primary page
import Main from "./Public/Main/Main"

//These are our individually routed pages
import Artists from "./Public/Artists/Artists";
import Events from "./Public/Events/Events";
import Producers from "./Public/Producers/Producers";
import Venues from "./Public/Venues/Venues";
import Dashboard from "./Dashboard/Main/Dashboard"

//These are our main components
import Footer from "./Public/Main/components/Footer"
import NavBar from "./Public/Main/components/NavBar";
import Cities from "./Public/Cities/Cities";
import Pages from "./Dashboard/Pages/Pages";
import Page from "./Public/Pages/Page";
import City from "./Public/Cities/views/City";
import ComingSoon from "./Public/Other/ComingSoon";

function App() {
    return (
        <div className="App">
            <StateProvider>
                <Router>
                    <Route exact path="/">
                        <ComingSoon />
                    </Route>
                    <Route exact path="/home">
                        <nav>
                            <NavBar />
                        </nav>
                        <Switch>
                            <Route path="/">
                                <Main />
                            </Route>

                            <Route path="/events">
                                <Events />
                            </Route>
                            <Route path="/cities">
                                <Cities />
                            </Route>
                            <Route path="/venues">
                                <Venues />
                            </Route>
                            <Route path="/producers">
                                <Producers />
                            </Route>
                            <Route path="/artists">
                                <Artists />
                            </Route>
                            <Route path="/dashboard">
                                <Dashboard />
                            </Route>
                            <Route path="/city/:id">
                                <City />
                            </Route>
                            <Route path="/:id">
                                <Page />
                            </Route>
                        </Switch>
                        <Footer />
                    </Route>
                </Router>
            </StateProvider>
        </div>
    );
}

export default App;
