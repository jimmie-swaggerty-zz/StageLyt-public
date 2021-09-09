import React, { useContext, useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { store } from "../../../context/StateProvider"
import $ from 'jquery'
import { faSlidersH, faHome, faPalette, faCity, faTicketAlt, faStar, faSignInAlt, faSignOutAlt, faUpload, faUserCircle, faMapMarkerAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import PageCard from '../components/PageCard'
import PagesSlider from '../forms/components/PagesSlider'
import Slider from '../../../Public/Other/components/Slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MyPages = (props) => {
    //Context for user
    const globalStateAndDispatch = useContext(store)
    const globalState = globalStateAndDispatch.state
    console.log("global state: ", globalState)
    const user_id = globalState.user.id

    const [pages, setPages] = useState([])
    //get pages owned
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pages/mypages/${user_id}`)
            .then((res) => {
                console.log(res.data)
                setPages(res.data)
            })
    }, [user_id])

    //filter pages
    // const pages = globalState.pages
    const [filter, setFilter] = useState("all")
    const [filteredData, setFilteredData] = useState(globalState.pages)

    const filterPages = (e) => {
        setFilter(e.target.value)
        setFilteredData(pages.filter(page => page.type === filter))
    }

    //checked button action
    const [viewDetails, setViewDetails] = useState(true)

    //disables details
    const changeView = (e) => {
        if ($('#toggleswitch').prop("checked")) {
            console.log(true)
            setViewDetails(true)
        }
        else {
            console.log(false)
            setViewDetails(false)
        }
    }

    //routing constants
    const { path, url } = useRouteMatch()

    const artists = pages.length > 1 && pages.filter(pages => pages.type === "artist") || []
    const venues = pages.length > 1 && pages.filter(pages => pages.type === "venue") || []
    const producers = pages.length > 1 && pages.filter(pages => pages.type === "producer") || []


    return (
        <div className="container-flex m-3">
            {artists && <div className="row" id="myartists">
                <Slider title="My Artists" divid="myartists" childstyle="col-lg-2 col-md-4 col-12" banner="true" icon={faPalette} expandable={true} exState={true}>
                    {artists.length > 0 && artists.map(page => {
                        console.log("this page is:", page)
                        return (

                            <PageCard page_id={page.id} details={viewDetails} type="dashboard" />
                        )
                    })}
                </Slider>
            </div>}
            {venues && <div className="row" id="myvenues">
                <Slider title="My Venues" divid="myvenues" childstyle="col-lg-2 col-md-4 col-12" banner="true" icon={faMapMarkerAlt} expandable={true} exState={false}>
                        {venues.length > 0 && venues.map(page => {
                        console.log("this page is:", page)
                        return (

                            <PageCard page_id={page.id} details={viewDetails} type="dashboard" />
                        )
                    })}
                </Slider>
            </div>}
            {producers && <div className="row" id="myproducers">
                <Slider title="My Producers" divid="myproducers" childstyle="col-lg-2 col-md-4 col-12" banner={true} icon={faStar} expandable={true}  exState={false} bottomBorder={true}>
                    {producers.length > 0 && producers.map(page => {
                        console.log("this page is:", page)
                        return (

                            <PageCard page_id={page.id} details={viewDetails} type="dashboard" />
                        )
                    })}
                </Slider>
            </div>}
            <div className="d-flex p-3 justify-content-around">
                <Link to={`${path}new`} className="btn w-50">Add Page</Link>
            </div>
        </div>

    )
}

export default MyPages