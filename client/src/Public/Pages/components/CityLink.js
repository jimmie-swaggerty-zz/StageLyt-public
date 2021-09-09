import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CityLink = (props) =>{
    const {id} = props
    const [city, setCity] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/cities/${id}`)
            .then((res) => {
                console.log(res.data)
                setCity(res.data)
            })
    }, [id])
    return(
        <a className="text-decoration-none" href="">{city.name}</a>
    )
}
export default CityLink