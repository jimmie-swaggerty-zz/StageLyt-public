import React, {useState} from 'react'
import EventsForm from '../components/EventsForm'
import axios from 'axios'
import {useHistory,useRouteMatch } from "react-router-dom";

const NewEvent = (props) => {
    const [data, setData] = useState([])
    const { path, url } = useRouteMatch();
    let history = useHistory()
    const submitHandler = (formData) => {
        // e.preventDefault();
            // do some stuff
        axios.post('http://localhost:8000/api/events', formData,{})
          .then((res) => {
            console.log(res.data);
            history.push(`/dashboard/events/update/${res.data.id}`);
          })
          .catch((err) => {
            console.log(err.response.data.errors);
            // setErrors(err.response.data.errors);
          })
      }
    return(
        <EventsForm initialData={data} title="New Event" submitHandler={submitHandler} buttonLabel="Create"/>
    )
}

export default NewEvent