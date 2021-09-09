import React from 'react'
import MyEvents from './views/MyEvents'
import { Route, Switch, useRouteMatch } from 'react-router'
import NewEvent from '../Events/forms/views/NewEvent'
import UpdateEvent from './forms/views/UpdateEvent'
const Events = (props) => {
    //routing constants
    const { path, url } = useRouteMatch()
    return( 
        <div className="container-flex">           
    <Switch>
        <Route exact path={`${path}/`}>
            <MyEvents />
            </Route>
        <Route path={`${path}/new`}>
            <NewEvent/>
        </Route>
        <Route path={`${path}/update/:id`}>
            <UpdateEvent/>
        </Route>
    </Switch>
    </div>
    )
}

export default Events