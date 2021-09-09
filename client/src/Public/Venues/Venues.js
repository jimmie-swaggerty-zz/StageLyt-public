import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../Other/components/Slider";
import PageCard from "../../Dashboard/Pages/components/PageCard";
import { faMapMarkedAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Venues = (props) => {
    const [pages, setPages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    // const {myPokes} = props
    useEffect(() => {
        axios
            .get(`process.env.REACT_APP_URL:8080/pages/category/venue`)
            .then((res) => {
                console.log(res.data);
                setPages(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log("catch error: " + err)
            })
    }, []);

    return (
        <div className="container-flex m-3">
            <div id="venuesfollow">
                <Slider title="Venues you follow" childstyle="col-lg-2 col-md-4 col-6" divid="venuesfollow" icon={faMapMarkerAlt} banner={true} expandable={true} exState={true} icon={faMapMarkerAlt}>
                    {pages && pages.map((page) => {
                        return (
                            <PageCard page_id={page.id} />
                        )
                    })}
                </Slider>
            </div>
            <div id="venues">
                <Slider title="All Venues" childstyle="col-lg-2 col-md-4 col-6" divid="venues" icon={faMapMarkerAlt}  banner={true} expandable={true} exState={true} icon={faMapMarkerAlt} bottomBorder={true}>
                    {pages && pages.map((page) => {
                        return (
                            <PageCard page_id={page.id} />
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default Venues