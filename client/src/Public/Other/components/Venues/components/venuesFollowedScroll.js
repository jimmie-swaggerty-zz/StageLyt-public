import React, {useState, useEffect} from 'react'
import Slider from '../Slider/Slider'
import axios from 'axios'
//temp data
// import { VenuesFollowed } from '../../reference/Venues'

const VenuesFollowedScroll = (props) => {
    const [venues, setVenues] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        axios.get('http://localhost:8000/venues')
        .then((res) => {
            console.log(res.data);
            setVenues(res.data)
            setLoaded(true)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])
    return(
        <div className="venues-followed" id="venues-followed">
            <Slider divid="venues-followed" data={venues} title="Venues Followed"/>
        </div>
    )
}

export default VenuesFollowedScroll