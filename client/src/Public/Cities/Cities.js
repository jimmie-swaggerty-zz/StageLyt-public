import React, { useState, useEffect } from "react";
import axios from "axios";
import CityCard from "./components/CityCard";
import Slider from "../Other/components/Slider";
import $ from 'jquery'
import { faBuilding, faCity } from "@fortawesome/free-solid-svg-icons";

const Cities = (props) => {
    const [cities, setCities] = useState([]);
    const [loaded, setLoaded] = useState(false);
    // const {myPokes} = props
    useEffect(() => {
        axios
            .get(`https://stagelyt-mysql.herokuapp.com/api/cities`)
            .then((res) => {
                console.log(res.data);
                setCities(res.data);
                setLoaded(true);
            })
            .catch(err=>{
                console.log("catch error: "+err)
            })
    }, []);

    return (
        <div id="cityslider" className="m-3"> 
            <Slider title="All Cities" childstyle="col-lg-3 col-md-6 col-12" divid="cityslider" banner={true} icon={faCity} bottomBorder={true}>
            {cities && cities.map((city)=>{
                return(
                    <CityCard city_id={city.id}/>
                )
            })}
            </Slider>
        </div>
    )
}

export default Cities