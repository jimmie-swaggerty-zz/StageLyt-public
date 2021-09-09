import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../Other/components/Slider";
import PageCard from "../../Dashboard/Pages/components/PageCard";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Producers = (props) => {
    const [pages, setPages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    // const {myPokes} = props
    useEffect(() => {
        axios
            .get(`http://localhost:8000/pages/category/producer`)
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
            <div id="producersfollow">
                <Slider title="Producers You Follow" divid="producersfollow" childstyle="col-lg-2 col-md-4 col-6" banner={true} expandable={true} exState={true} icon={faStar}>
                    {pages && pages.map((page) => {
                        return (
                            <PageCard page_id={page.id} />
                        )
                    })}
                </Slider>
            </div>
            <div id="producers">
                <Slider title="All Producers" divid="producers" childstyle="col-lg-2 col-md-4 col-6" banner={true} expandable={true} exState={true} icon={faStar} bottomBorder={true}>
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

export default Producers