import React, { useState, useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import ArtistSquare from '../../Artists/components/ArtistSlider/ArtistSquare'
import Slider from '../../Other/components/Slider'


const EventPageCast = (props) => {
    const { path, url } = useRouteMatch();
    const { id } = props
    const [cast, setCast] = useState([])
    const history = useHistory()
    useEffect(() => {
        axios.get(`http://https://stagelyt-mysql.herokuapp.com/api/bookings/events/approve/${props.id}`)
            .then((res) => {
                console.log(res)
                setCast(res.data)
            })
            .catch((err) => {
                console.log("catch error: ", err);
            });
    }, [props.id]);
    return (
        <div className="">
            {cast.length>0 &&
            <Slider childstyle="col-3" banner={true} title="Cast and Crew" exState={true} bottomBorder={true}>
            {cast && cast.map((castmember)=>{
                return(
                    <div onClick={(e)=>{e.preventDefault();history.push(`/${castmember.artist_id}`)}} type="button">
                    <ArtistSquare id={castmember.artist_id}>
                        {castmember.type} - {castmember.role}
                        </ArtistSquare>
                    </div>
                )
            }
            )}
            </Slider>}
        </div>
    )
}

export default EventPageCast