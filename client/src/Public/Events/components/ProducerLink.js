import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProducerLink = (props) => {
    const { id } = props
    const [producer, setProducer] = useState({})
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:8000/api/pages/${id}`)
            .then((res) => {
                console.log("res data get producer", res.data);
                setProducer(res.data)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <span>{loaded && <a href={`/producers/${id}`}>{producer.name}</a>}
        </span>
    )
}
export default ProducerLink
