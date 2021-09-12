import React, {useEffect, useState} from 'react'
import Slider from '../Slider/Slider'
import axios from 'axios'

//temp data
// import { Venues } from '../../reference/Venues'

const LocalVenuesScroll = (props) => {
    const [venues, setVenues] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        axios.get('https://stagelyt-mysql.herokuapp.com/venues')
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
        <div className="localvenues" id="localvenues">
            <Slider divid="localvenues" data={venues} title="Local Venues"/>
        </div>
    )
}

export default LocalVenuesScroll