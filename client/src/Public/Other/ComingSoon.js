import axios from 'axios'
import React, { useState } from 'react'
import logo from '../../Images/StageLyt-08.png'

const ComingSoon = () => {
    const [formData, setFormData] = useState([])
    const [submitMessage, setSubmitMessage] = useState("")

    const submit = () => {
        axios.post('http://localhost:8080/api/subscribe', formData)
            .then((res) => {
                console.log(res);
                setSubmitMessage("Thank you for subscribing!")
            })
            .catch((err) => {
                console.log(err.response);
                setSubmitMessage("Please complete the form")
            })
    }

    const inputChange = (e) => {
        let newStateObject = { ...formData };
        newStateObject[e.target.name] = e.target.value;
        setFormData(newStateObject);
        console.log("new data", formData);
    };

    return (
        <div className="container align-middle d-flex bg-dark" style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <div className="m-4 bg-dark align-middle justify-content-around" style={{ height: "100%" }}>
                <div className="w-100 text-center">
                    <div className=""><h1 className="text-center text-white">Coming Soon</h1></div>
                    <div className="mb-5"><img src={logo} width="90%" /></div>
                    <div className="">
                        <h4 className="text-center text-white mb-3">Subscribe for Updates</h4>
                        <form onSubmit={e => { e.preventDefault(); submit(e) }}>
                            <div className="row justify-content-center">
                                <div className="col-lg-3 col-6">
                                    <div className="mb-3">
                                        <input type="text" name="name" placeholder="Name" className="form-control text-center" onChange={e => { e.preventDefault(); inputChange(e) }} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" name="email" placeholder="Email" className="form-control text-center" onChange={e => { e.preventDefault(); inputChange(e) }} />
                                    </div>
                                    <div className="mb-3">
                                        <select type="text" name="type" placeholder="Type" className="form-select text-center" onChange={e => { e.preventDefault(); inputChange(e) }} >
                                            <option selected>What type of user are you?</option>
                                            <option value="producer">Producer</option>
                                            <option value="artist">Artist</option>
                                            <option value="venue">Venue</option>
                                            <option value="patron">Patron</option>
                                        </select>
                                    </div>
                                    <div className="">
                                        <button className="btn btn-danger w-100" type="submit">Subscribe</button>
                                        {submitMessage && <p className="text-white mt-3">{submitMessage}</p>}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="mb-3 text-center fixed-bottom">
                <h6 className="text-white">Brought to you by <a href="https://QueerCoded.net" target="_blank" className="decoration-none link-light">QueerCoded, Inc</a></h6>
            </div>
        </div>
    )
}

export default ComingSoon