import React, { useContext, useState, useEffect } from 'react'
import { useRouteMatch, Route, Switch } from 'react-router-dom'
import { store } from '../../context/StateProvider'
import MyPages from './views/MyPages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import NewPageForm from './forms/components/NewPageForm'
import PageUpdate from './forms/views/PageUpdate'

const Pages = (props) => {
    //Context for user
    const globalStateAndDispatch = useContext(store)
    const globalState = globalStateAndDispatch.state
    console.log("global state: ", globalState)

    //pull pages
    const pages = globalState.pages
    console.log("My pages are:", pages)

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
                    <MyPages />
                </Route>
                <Route path={`${path}/new`}>
                    <NewPageForm />
                </Route>
                <Route path={`${path}/update/:id`}>
                    <PageUpdate />
                </Route>
            </Switch>
        </div>
    )
}

export default Pages