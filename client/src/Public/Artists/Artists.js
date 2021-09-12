import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "../Other/components/Slider";
import PageCard from "../../Dashboard/Pages/components/PageCard";
import { faPalette, faPallet, faStar } from "@fortawesome/free-solid-svg-icons";

const Artists = (props) => {
    const [pages, setPages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    // const {myPokes} = props
    useEffect(() => {
        axios
            .get(`http://localhost:8080/pages/category/artist`)
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
            <div id="artistsfollow">
                <Slider title="Artists You Follow" divid="artistsfollow" childstyle="col-lg-2 col-md-4 col-6" banner={true} expandable={true} exState={true} icon={faPalette}>
                    {pages && pages.map((page) => {
                        return (
                            <PageCard page_id={page.id} />
                        )
                    })}
                </Slider>
            </div>
            <div id="artists">
                <Slider title="All Artists" divid="artists" childstyle="col-lg-2 col-md-4 col-6" banner={true} expandable={true} exState={true} icon={faPalette}  bottomBorder={true}>
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

export default Artists