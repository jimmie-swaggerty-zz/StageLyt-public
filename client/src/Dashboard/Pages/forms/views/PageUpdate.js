import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams, useHistory } from "react-router-dom";
import PagesForm from "../components/PagesForm";

const PageUpdate = (props) => {
  const {id} = useParams()
  const [initialData, setInitialData] = useState({})
  const [loaded, setLoaded] = useState(false)
  const history = useHistory()
  console.log(id)
  const updateHandler=(data)=>{
              // do some stuff
              axios.put(`http://localhost:8000/api/pages`, data ,{})
              .then((res) => {
                console.log(res.data);
                history.push(`/${id}`)
              })
              .catch((err) => {
                console.log(err.response.data.errors);
                // setErrors(err.response.data.errors);
              })
  }
  useEffect(() => {
      axios
          .get(`http://localhost:8000/api/pages/${id}`)
          .then((res) => {
              console.log("res data for page form",res.data);
             setInitialData(res.data);
             setLoaded(true)
          })
          .catch((err) => {
              console.log("catch error: " + err);
          });
  }, [id]);
  return (
    <div className="container">
      {loaded && <PagesForm initialData={initialData} submitHandler={updateHandler} buttonLabel="Update" type="update" />}
    </div>
  );
};

export default PageUpdate
