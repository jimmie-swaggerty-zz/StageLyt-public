import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ImageDisplayS3 from '../../../Other/components/Images/ImageDisplayS3'

const ArtistSquare = props => {
    const {id} = props
    const [artist, setArtist] = useState([])

    useEffect(() => {
        axios.get(`http://https://stagelyt-mysql.herokuapp.com/api/pages/${id}`)
        .then((res)=>{
            setArtist(res.data)
            console.log("artist is ", res.data)
        })
    },[id])
    return(
        <div className="card text-center">
            <ImageDisplayS3 imageURL={artist.profileImg_id} imageRatioType="square" className="card-img-top"/>
            <div className="card-footer">
            <h6 class="card-title">{artist.name}</h6>
            <p className="card-text">{props.children}</p>
            </div>
        </div>
    )
}

export default ArtistSquare