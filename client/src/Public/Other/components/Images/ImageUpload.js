import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { store } from "../../../../context/StateProvider"

const ImageUploadS3 = (props) => {
    const { imageRatioType, imageUpdate, imageURL, page_id, image_name } = props
    const [imageData, setImageData] = useState({ id: imageURL })
    const [displayImage, setDisplayImage] = useState({})
    const [style, setStyle] = useState({})

    const globalStateAndDispatch = useContext(store)
    const globalState = globalStateAndDispatch.state
    console.log("global state", globalState)

    const onFileChange = (e) => {
        e.preventDefault()
        let newImageObject = e.target.files[0];
        console.log("new Image Object", newImageObject)
        onSubmit(newImageObject)
    };
    useEffect(() => {
        const url = displayImage.path
        setStyle({
            backgroundImage: `url(${url})`
        })
    }, [displayImage])

    const onSubmit = (image) => {
        console.log(image)
        const formData = new FormData();
        formData.append("profileImg", image);
        formData.append("page_id", page_id);
        // console.log(image)
        console.log(formData)

        axios
            .post(
                // `http://localhost:8000/api/images/profile/${profileid}`,
                `http://localhost:8000/api/image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            .then((res) => {
                setImageData(res.data)
                imageUpdate(res.data.id)
                console.log("results of submit", res);
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/image/${imageData.id}`)
            .then((res) => {
                setDisplayImage(res.data)
                console.log("get data", res.data)
            })
    }, [imageData])
    return (
        <div className="col-12">
            <div className={`image-display ${imageRatioType}`} style={style}></div>
            <div className="mb-3">
                <div className="col-12">
                    <input type="file" id="file-input" onChange={(e)=>{onFileChange(e)}} className="form-control" />
                </div>
            </div>
        </div>

    );
};

export default ImageUploadS3