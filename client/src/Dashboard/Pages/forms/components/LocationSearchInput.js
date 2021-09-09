import React, {useState, useEffect} from 'react'
import axios from 'axios'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

  const LocationSearchInput = () => {
    const [address, setAddress] = useState("")
    const [input, setInput] = useState("")
    const APIKEY = process.env.REACT_APP_GOOGLE_API
    // useEffect(()=>{
    //     axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/output?${input}`)
    //     .then((res)=>{
    //         console.log(res)
    //     })
    // },[input])

    // const inputChangeHandler = (e) =>{
    //     e.preventDefault()
    //     setInput(e.target.value)
    // }
    return (
  <div>
    <GooglePlacesAutocomplete
      apiKey={APIKEY}
    />
      </div>
    );
  };

  export default LocationSearchInput