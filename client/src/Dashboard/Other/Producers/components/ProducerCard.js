import React, { useContext, useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import ImageDisplayS3 from '../../../../components/Images/ImageDisplayS3'

const ProducerCard = (props) => {
    //producer_id from parent
    const { profile_id } = props;
    console.log("this profiles id is", profile_id)
    //producer display data
    const [producer, setProducer] = useState([])

    //pull producer profiles
    useEffect(() => {
        axios.get(`https://stagelyt-mysql.herokuapp.com/artists/byprofile/${profile_id}`)
            .then((res) => {
                console.log("res data get producers", res.data[0]);
                setProducer(res.data[0])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const { path, url } = useRouteMatch();

    return (
        <div class="card" style={{width: '18rem'}}>
            <ImageDisplayS3 className="card-img-top" imageURL={producer.profileImg} imageRatioType="square"/>
            <div class="card-body text-center bg-purple">
                <h5 class="card-title">{producer.name}</h5>
                <p class="card-text">Slug : {producer.profile_slug}</p>
                <a href={`./dashboard/updateproducer/${producer.id}`} className="btn btn-light">Update</a>
            </div>
        </div>
    )
}

export default ProducerCard