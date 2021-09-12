import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faKeyboard, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'

const SlugInput = (props) => {
    const { initialSlug, changeHandler } = props;
    const [slugInput, setSlugInput] = useState(initialSlug)

    const messageSigns = {
        empty: {
            color: "gray",
            message: "Please insert slug",
            icon: <FontAwesomeIcon icon={faSpinner} />
        },
        error: {
            color: "red",
            message: "Slug already exists",
            icon: <FontAwesomeIcon icon={faTimes} />
        },
        success: {
            color: "green",
            message: "slug is available",
            icon: <FontAwesomeIcon icon={faCheck} />
        },
        short: {
            color: "orange",
            message: "Must be more than 5 characters",
            icon: <FontAwesomeIcon icon={faSpinner} />
        }
    }

    const [message, setMessage] = useState(messageSigns.empty)

    const inputChange = (e) => {
        e.preventDefault()
        e.target.value=e.target.value.toLowerCase().replace(/ /g, "-");
        setSlugInput(e.target.value)
        changeHandler(slugInput)

    };

    useEffect(()=> {
        console.log("checking slug...", slugInput)
        if (slugInput === "") {
            setMessage(messageSigns.empty)
        }
        else if (5>slugInput.length>0 ) {
            setMessage(messageSigns.short)
        }
        else{
            axios.get(`http://https://stagelyt-mysql.herokuapp.com/profiles/bySlug/${slugInput}`)
                .then((res) => {
                    console.log("Slug check results: ", res)
                    if (res.status === 500 ){
                        setMessage(messageSigns.error)
                    }
                    else if (res.data==="available"){
                        setMessage(messageSigns.success)
                    }
                    else if (res.data==="taken"){
                        setMessage(messageSigns.error)
                    }
                })
        }
    },[slugInput])

    return (
        <div>
            <label>Slug</label>
            <div class="input-group mb-3">
                <input className="form-control" value={slugInput} name="slug" onChange={(e) => { e.preventDefault(); inputChange(e) }} />
                <div class="input-group-append">
                    <span class="input-group-text input-icon" style={{ backgroundColor: message.color }} id="basic-addon1" title={message.message}>{message.icon}</span>
                </div>
            </div>
        </div>
    )
}

export default SlugInput