import React, { useState, useContext } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

//bring in context
import { store } from '../../../../context/StateProvider'

// //Import slug input component
// import SlugInput from "../../forms/components/SlugInput"

const NewPageForm = (props) => {
    // work with context
    const globalStateAndDispatch = useContext(store)
    const globalState = globalStateAndDispatch.state
    const globalDispatch = globalStateAndDispatch.dispatch
    const user_id = globalState.user.id

    //set form data
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState([])

    //update form data on input
    const inputChange = (e) => {
        let newStateObject = { ...formData };
        newStateObject[e.target.name] = e.target.value;
        setFormData(newStateObject);
        console.log("new data", formData);
    };

    //Allows link navigation
    let history = useHistory()

    //Submit
    const submitHandler = () => {
        axios.post(`http://localhost:8000/api/pages/${user_id}`, formData, {})
            .then((res) => {
                console.log(res.data);
                history.push(`/dashboard/pages/update/${res.data.page_id}`);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err);
            })
    }

    return (
        <div className="container">
            <div className="container mt-5 profile-wrapper">
                <div className="card">
                    <div className="card-header text-center">
                        <h5 className="card-title">Add Page</h5>
                    </div>
                    <form>
                        <div className="row card-body">
                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <label>Page Name</label>
                                    <input
                                        className=" form-control"
                                        type="text"
                                        placeholder="Page Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => inputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label>Page Handle</label>
                                    <input
                                        className=" form-control"
                                        type="text"
                                        placeholder="Page handle"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={(e) => inputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                {/* <SlugInput/> */}
                                <label>Page Category</label>
                                <select
                                    className="form-select"
                                    name="type"
                                    value={formData.type}
                                    onChange={(e) => inputChange(e)}
                                >
                                    <option selected></option>
                                    <option value="artist">Artist</option>
                                    <option value="producer">Producer</option>
                                    <option value="venue">Venue</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className="card-footer text-center">
                        {/* <input type="submit" className="btn">{buttonLabel}</input> */}
                        <button onClick={e => { e.preventDefault(); submitHandler(formData) }} className="btn">Create Page</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPageForm;
