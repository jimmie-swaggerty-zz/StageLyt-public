import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'
import EventsForm from '../components/EventsForm'

const UpdateEvent = (props) => {
    const {id} = useParams()
    const [initialData, setInitialData] = useState([])
    const [loaded, setLoaded] = useState(false)
    console.log(id)
    const history = useHistory()
    const updateHandler=(data)=>{
                // do some stuff
                axios.put(`process.env.REACT_APP_URL:8080/api/events/update/${id}`, data,{})
                .then((res) => {
                  console.log(res.data);
                  history.push('/events')
                })
                .catch((err) => {
                  console.log(err.response.data.errors);
                  // setErrors(err.response.data.errors);
                })
    }
    useEffect(() => {
        axios
            .get(`process.env.REACT_APP_URL:8080/api/events/${id}`)
            .then((res) => {
                console.log(res.data);
                setInitialData(res.data);
                setLoaded(true)
            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, [id]);
    return(
        <div className="container">
        {loaded && <EventsForm initialData={initialData} title={`Update ${initialData.name}`} submitHandler={updateHandler} buttonLabel="Update" type="update"/>}
        </div>
    )
}

export default UpdateEvent