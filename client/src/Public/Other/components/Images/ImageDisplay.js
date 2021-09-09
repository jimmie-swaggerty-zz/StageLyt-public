import React, { useState, useEffect } from 'react'
import axios from 'axios'
const ImageDisplayS3 = (props) => {
    const [displayImage, setDisplayImage] = useState([])
    const { imageURL, imageRatioType, alt } = props
    const [style, setStyle] = useState({})
    useEffect(()=> {
        const url = displayImage.path
        console.log(url)
        console.log("This images id is",imageURL)
        setStyle({
            backgroundImage: `url(${url})`
        })
    },[displayImage])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/image/${imageURL}`)
            .then((res) => {
                setDisplayImage(res.data)
                console.log("get data", res.data)
            })
    }, [imageURL])
    return (
        <div className={`image-display ${imageRatioType}`} style={style}>
            
        </div>
    )
}

export default ImageDisplayS3