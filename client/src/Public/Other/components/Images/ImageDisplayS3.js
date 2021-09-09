import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ImageDisplayS3 = (props) => {
    const { imageURL, imageRatioType} = props
    const [style, setStyle] = useState({})
    console.log("ImageDisplayS3", imageURL)
    useEffect(()=> {
        setStyle({
            backgroundImage: `url(${imageURL})`
        })
    },[imageURL])

    return (
        <div className={`image-display ${imageRatioType}`} style={style}>
            
        </div>
    )
}

export default ImageDisplayS3