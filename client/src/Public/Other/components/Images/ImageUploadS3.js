import React, { useState, useEffect } from 'react'
import { uploadFile } from 'react-s3'
import axios from 'axios'
import uuid from "react-uuid"
const path = require("path");


const accessKeyId = process.env.REACT_APP_ACCESSKEY_ID
const secretAccessKey = process.env.REACT_APP_SECRETACCESSKEY
const ImageUploadS3 = (props) => {
    const { imageRatioType, imageUpdate, imageURL } = props
    const [style, setStyle] = useState({})
    const [displayImage, setDisplayImage] = useState(imageURL)


    useEffect(() => {
        const url = displayImage
        setStyle({
            backgroundImage: `url(${url})`
        })
    }, [displayImage])

    const config = {
        bucketName: 'bookdiva-images',
        dirName: '', /* optional */
        region: 'us-east-2',
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }

    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleUpload = async (e) => {
    //     let file = e.target.files[0]
    //     console.log("file", file)
    //     let ext = path.extname(file.name)
    //     console.log("ext", ext)
    //     let newFileName = uuid()
    //     axios.post('https://stagelyt-mysql.herokuapp.com/api/s3images/upload',
    //         {
    //             fileName: newFileName,
    //             fileType: ext
    //         })
    //         .then(response => {
    //             console.log(signedRequest)
    //             var returnData = response.data.data.returnData;
    //             var signedRequest = returnData.signedRequest;
    //             var url = returnData.url;
    //             console.log("Recieved a signed request " + signedRequest);

    //             // Put the fileType in the headers for the upload
    //             var options = {
    //                 headers: {
    //                     'Content-Type': ext.splice(1)
    //                 }
    //             };
    //             axios.put(signedRequest, file, options)
    //                 .then(result => {
    //                     console.log("Response from s3", result.config)
    //                     setDisplayImage(result.config.url)
    //                     // this.setState({ success: true });
    //                 })
    //                 .catch(error => {
    //                     console.log("ERROR " + JSON.stringify(error));
    //                 })
    //         })
    //         .catch(error => {
    //             console.log(JSON.stringify(error));
    //         })
    // }


    const handleUpload = async (e) => {
        const fileName = uuid()+"."+e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.')+1);
        console.log("fileName", fileName)
        const myNewFile = new File([e.target.files[0]], fileName, {type: e.target.files[0].type});
        console.log(myNewFile)
        uploadFile(myNewFile, config)
            .then(data => {
                console.log(data)
                setDisplayImage(data.location)
                imageUpdate(data.location)
            }
            )
            .catch(err => console.error(err))
    }

    return (
        <div className="col-12">
            <div className={`image-display ${imageRatioType}`} style={style}></div>
            <div className="mb-3">
                <div className="col-12">
                    <input type="file" id="file-input" onChange={e => handleUpload(e)} className="form-control" />
                </div>
            </div>
        </div>
    )
}

export default ImageUploadS3