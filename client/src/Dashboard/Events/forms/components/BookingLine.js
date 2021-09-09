import React, { useEffect, useState } from 'react'
import axios from 'axios'
const BookingLine = props => {
    const { data, removeBooking, updateBookings } = props
    const [artist, setArtist] = useState([])
    const [status, setStatus] = useState(data.producer_status)
    const page_id = data.artist_id

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pages/${page_id}`)
            .then((res) => {
                console.log("this is the artist", res.data);
                setArtist(res.data)
            })
    }, [])


    const updateStatus = (status) => {
        console.log(data.id)
        console.log(status)
        axios.put(`http://localhost:8000/api/bookings/send/${data.id}`, {status: status})
            .then((res) => {
                console.log("booking info booking",res.data);
                updateBookings()
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                // setErrors(err.response.data.errors);
            })
    }
    return (
        <tr>
            <td>
                {artist.name}
            </td>
            <td>
                {data.type}
            </td>
            <td>
                {data.role}
            </td>
                <td>
                {data.artist_status==="denied" ? <span className="label label-red">Denied</span> : data.artist_status==="accepted" ? <span className="label label-green">Accepted</span> : <span className="label label-yellow">Pending</span>}
                    </td>
            <td>
            <select value={data.producer_status} className="form-select" name="producer_status" onChange={(e)=>{e.preventDefault(); setStatus(e.target.value); updateStatus(e.target.value)}}>
                    <option value="draft">Draft</option>
                    <option value="send">Send</option>
                </select>
            </td>
            <td>
                ${data.pay}
            </td>
            {/* <td>
                {data.payDetails}
            </td> */}
            <td>
                {data.acts}
            </td>
            <td>
                <button className="btn" onClick={(e)=>{e.preventDefault();removeBooking(data.id)}}>Delete</button>
            </td>
            <td>
                <button className="btn">Edit</button>
            </td>
        </tr>
    )
}

export default BookingLine