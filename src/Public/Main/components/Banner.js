import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Banner = (props) => {
    const banner1 = ""
    const banner2 = ""
    const banner3 = ""
    const data = [
        { "name": "ON EVERY STREET CORNER", "status": "active", banner: banner1 },
        { "name": "IN EVERY NEIGHBORHOOD", banner: banner2 },
        { "name": "THERE'S A SHOW FOR YOU", banner: banner3 },
    ]
    return (
        <div className="mb-2">
            <div className="main-banner">
                <div id="carousel-banner" className="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {data.map((banner, idx) => {
                            const image = banner.banner
                            const style = { backgroundImage: `url(${banner.banner})` }
                            return (
                                <div className={`carousel-item ${banner.status}`} style={style}>
                                    {/* <div class="carousel-caption d-md-block"> */}
                                        {/* <h1 className="carousel-title">{banner.name}</h1> */}
                                        {/* <p>{banner.subtitle}</p> */}
                                    {/* </div> */}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
