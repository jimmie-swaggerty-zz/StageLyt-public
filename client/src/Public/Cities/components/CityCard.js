import React, { useContext, useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import ImageDisplayS3 from "../../../Public/Other/components/Images/ImageDisplayS3"


const CityCard = (props) => {
    //city_id from parent
    const { city_id, details, type } = props;
    console.log("this profiles id is", [city_id])
    //city display data
    const [city, setCity] = useState([])
    const [loaded, setLoaded] = useState(false)

    //pull city profiles
    useEffect(() => {
        axios.get(`http://localhost:8080/api/cities/${city_id}`)
            .then((res) => {
                console.log("res data get cities", res.data);
                setCity(res.data)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const { path, url } = useRouteMatch();

    return (
        <div class="card col-12">
            <ImageDisplayS3 className="card-img-top" imageURL={city.profileImg_id} imageRatioType="banner" alt={city.name} />
            <div class="card-body text-center">
                <h5 class="card-title">{city.name}</h5>
                {city.state && <h6 class="card-text">{city.state}</h6>}
                {type==="dashboard" && <a href={`/dashboard/citys/update/${city.id}`} className="btn btn-light w-50">Update</a>}
                <a href={`/city/${city.id}`} className="btn btn-light w-50">View</a>
            </div >
        </div>
    )
}

export default CityCard