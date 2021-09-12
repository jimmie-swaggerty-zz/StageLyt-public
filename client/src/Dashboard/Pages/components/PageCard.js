import React, { useContext, useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import ImageDisplayS3 from "../../../Public/Other/components/Images/ImageDisplayS3"


const PageCard = (props) => {
    //page_id from parent
    const { page_id, details, type } = props;
    console.log("this profiles id is", [page_id])
    //page display data
    const [page, setPage] = useState([])
    const [loaded, setLoaded] = useState(false)

    //pull page profiles
    useEffect(() => {
        axios.get(`http://https://stagelyt-mysql.herokuapp.com/api/pages/${page_id}`)
            .then((res) => {
                console.log("res data get pages", res.data);
                setPage(res.data)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const { path, url } = useRouteMatch();

    return (
        <div class="card col-12" type="button">
            <ImageDisplayS3 className="card-img-top" imageURL={page.profileImg_id} imageRatioType="square" alt={page.name} />
            {page.type && <div class="card-body text-center">
                <h6 class="card-title">{page.name}</h6>
                <p class="card-text">{page.type.slice(0, 1).toUpperCase() + page.type.slice(1)}</p>
                    {type === "dashboard" && <a href={`/dashboard/pages/update/${page.id}`} className="btn btn-light w-50">Update</a>}
                    <a href={`/${page.id}`} className="btn btn-light w-50">View</a>
            </div >}
        </div >
    )
}

export default PageCard