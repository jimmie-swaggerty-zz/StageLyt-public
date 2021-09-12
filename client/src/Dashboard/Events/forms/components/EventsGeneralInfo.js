import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import ImageUploadS3 from "../../../../Public/Other/components/Images/ImageUploadS3"
import { Editor } from '@tinymce/tinymce-react';

const EventsGeneralInfo = (props) => {
    const tinycloudapi = process.env.REACT_APP_TINY_CLOUD_API
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState();
    const [error, setError] = useState({})
    const [producers, setProducers] = useState([]);
    const [venues, setVenues] = useState([])
    const { formData, inputChange, type, submitHandler, imageUpdate, descriptionUpdate } = props

    // For Editor
    const editorRef = useRef(null);

    const removeValue = (index, arr) => {
        let array = [];
        for (let i = 0; i < arr.length; i++) {
            if (i !== index) {
                array.push(arr[i]);
            }
        }
        console.log(array);
        setTags(array);
    };


    const summaryHandler = (e) => {
        e.preventDefault()
        console.log("length", e.target.value.length)
        if (e.target.value.length > 150) {
            e.target.value = e.target.value.slice(0, 149)
            error.summary = "Summary cannot be over 150 characters"
            inputChange(e)
        }
        else {
            inputChange(e)
        }
    }
    const titleHandler = (e) => {
        e.preventDefault()
        console.log("length", e.target.value.length)
        if (e.target.value.length > 75) {
            e.target.value = e.target.value.slice(0, 74)
            error.title = "Title cannot be over 75 characters"
            inputChange(e)
        }
        else {
            inputChange(e)
        }
    }
    useEffect(() => {
        axios
            .get(`https://stagelyt-mysql.herokuapp.com/api/pages`)
            .then((res) => {
                console.log(res.data);
                setProducers(res.data);

            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://stagelyt-mysql.herokuapp.com/pages/category/venue`)
            .then((res) => {
                console.log(res.data);
                setVenues(res.data);

            })
            .catch((err) => {
                console.log("catch error: " + err);
            });
    }, []);
    const richtextchange = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            descriptionUpdate(editorRef.current.getContent().toString())
        }
    }
    return (
        <div className="form-body-tabbed">
            <div className="container">
                <form>
                    <div className="row">
                        <h3 className="form-header">General Info</h3>
                        <div className="col-lg-12">
                            <div className="mb-3">
                                <label>Event Name</label>
                                <input
                                    className=" form-control"
                                    type="text"
                                    placeholder="Event Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => titleHandler(e)}
                                />
                                {error.title && <p className="error">{error.title}</p>}
                            </div>
                            <div className="row">
                                <label>
                                    Banner Image
                                </label>
                                <div className="row">
                                    <div className="col-12">
                                        <ImageUploadS3 imageRatioType="banner border" imageURL={formData.bannerImg_id} imageUpdate={imageUpdate} page_id={formData.id} />
                                    </div>
                                </div>
                                <div className="mb-3 col-lg-4">
                                    <label>Producer</label>

                                    <select
                                        className="form-select "
                                        name="artist_id"
                                        value={formData.artist_id}
                                        onChange={(e) => inputChange(e)}
                                        searchable="Find Producer"
                                    >
                                        <option selected value=""></option>
                                        {producers.length > 0 && producers.map((producer, idx) => {
                                            return (
                                                <option value={producer.id}>{producer.name}</option>
                                            )
                                        })}
                                    </select>

                                </div>
                                <div className="mb-3 col-lg-4">
                                    <label>Venue</label>
                                    <select className="form-select" value={formData.venue_id} name="venue_id" onChange={(e) => inputChange(e)}>
                                        <option selected value="0"></option>
                                        {venues.length > 0 && venues.map((venue, idx) => {
                                            return (
                                                <option value={venue.id}>{venue.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3 col-lg-4">
                                <label>Event ID</label>
                                <input class="form-control" id="disabledInput" type="text" value={formData.id} disabled />
                            </div>
                            </div>

                            <div className="mb-3">
                                <label>Event Summary</label>
                                <textarea
                                    className="form-control"
                                    type="text"
                                    placeholder="Event Summary"
                                    rows="3"
                                    value={formData.description}
                                    name="description"
                                    onChange={(e) => summaryHandler(e)}
                                />
                                {error.summary && <p className="error">{error.summary}</p>}
                            </div>
                            {/* <div className="mb-3">
                                <label>Event Description</label>
                                <Editor
                                    apiKey={tinycloudapi}
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={formData.description}
                                    onBlur={(e)=>{richtextchange()}}
                                    init={{
                                      height: 500,
                                      menubar: true,
                                      plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                      ],
                                      statusbar: false,
                                      toolbar: 'undo redo | formatselect | ' +
                                      'bold italic backcolor | alignleft aligncenter ' +
                                      'alignright alignjustify | bullist numlist outdent indent | ' +
                                      'removeformat | help',
                                      content_style: 'body {font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; font-size:1rem }',
                                    }}
                                  />
                            </div> */}

                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="mb-3 col-lg-4">
                                    <label>
                                        Doors
                                    </label>
                                    <input
                                        className=" form-control"
                                        type="datetime-local"
                                        placeholder="Doors"
                                        value={formData.doors && formData.doors.substring(0, 16) || ""}
                                        name="doors"
                                        onChange={(e) => inputChange(e)}
                                    />
                                </div>
                                <div className="mb-3 col-lg-4">
                                    <label>
                                        Start Date
                                    </label>
                                    <input
                                        className=" form-control"
                                        type="datetime-local"
                                        placeholder="Event Start"
                                        value={formData.start && formData.start.substring(0, 16) || ""}
                                        name="start"
                                        onChange={(e) => inputChange(e)}
                                    />
                                </div>
                                <div className="mb-3 col-lg-4">
                                    <label>End Date</label>
                                    <input
                                        className=" form-control"
                                        type="datetime-local"
                                        placeholder="Event End"
                                        value={formData.end && formData.end.substring(0, 16) || ""}
                                        name="end"
                                        onChange={(e) => inputChange(e)}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        {/* <input type="submit" className="btn">{buttonLabel}</input> */}
                    </div>
                </form>
                <div className="row">
                    {/* <input type="submit" className="btn">{buttonLabel}</input> */}
                    <button onClick={e => { e.preventDefault(); submitHandler(formData) }} className="btn">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default EventsGeneralInfo;
