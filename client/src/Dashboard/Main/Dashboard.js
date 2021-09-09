import React, { useContext } from 'react'

import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';

//pull context provider
import { store } from './../../context/StateProvider'

//Load main page
import MainDashboard from '../Main/views/MainDashboard'
import DashboardNavBar from '../Main/components/DashboardNavBar'
import Pages from '../Pages/Pages';
import Events from '../Events/Events';
import Bookings from '../Bookings/Bookings';
const Dashboard = (props) => {
    //Context for user
    const globalStateAndDispatch = useContext(store)
    const globalState = globalStateAndDispatch.state

    //routing constants
    const { path, url } = useRouteMatch()

    return (
        <div className="">
            <DashboardNavBar />
            <Switch>
                <Route exact path={`${path}`}>
                    <Redirect to={`${path}/pages`} />
                </Route>
                <Route path={`${path}/pages`}>
                    <Pages />
                </Route>
                <Route path={`${path}/events`}>
                    <Events />
                </Route>
                <Route path={`${path}/bookings`}>
                    <Bookings />
                </Route>
            </Switch>
        </div>
    )
}

export default Dashboard