import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VenueLink = (props) => {
    const { id } = props
    const [venue, setVenue] = useState({})
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:8000/api/pages/${id}`)
            .then((res) => {
                console.log("res data get venue", res.data);
                setVenue(res.data)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <span>{loaded && <a href={`/venues/${id}`}>{venue.name}</a>}
        </span>
    )
}
export default VenueLink
