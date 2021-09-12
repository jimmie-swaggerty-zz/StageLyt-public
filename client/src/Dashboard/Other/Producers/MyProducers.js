import React, { useContext, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { store } from '../../../context/StateProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import ProducerCard from './components/ProducerCard'

const MyProducers = (props) => {
    //Context for user
    const globalStateAndDispatch = useContext(store)
    const globalState = globalStateAndDispatch.state
    console.log("global state: ", globalState)

    //pull producers
    const producers = globalState.profiles.filter(producer => producer.type === "producer")
    console.log("My producers are:", producers)


    return (
        <div className="container-flex">
            <div className="row bg-purple dashboard-section-banner mb-3">
                <div className="col-12">
                    <h3 className="">                    <FontAwesomeIcon icon={faPalette} className="fa-1x" /> My Producers</h3>

                </div>

            </div>
            <div className="container">
                <div className="row justify-content-around mb-3">
                    {producers && producers.map(producer => {
                        return (
                            <div className="col-lg-3">
                                <ProducerCard profile_id={producer.id} />
                            </div>
                        )
                    })}
                </div>
                <div className="row justify-content-around">
                    <Link to="/dashboard/addartist" className="btn">Add Producer</Link>
                </div>
            </div>
        </div>
    )
}

export default MyProducers