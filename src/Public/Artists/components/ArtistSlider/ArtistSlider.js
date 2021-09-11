import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const ArtistSlider = (props) => {
    const { divid, data, title, icon, iconTitle} = props;
    const scroll = (direction) => {
        let far = ($(`#${divid} .image-container`).width() / 2) * direction;
        let pos = $(`#${divid} .image-container`).scrollLeft() + far;
        $(`#${divid} .image-container`).animate({ scrollLeft: pos }, 1000);
    };
    console.log(data);
    return (
        <div className="main">
            <div className="purple-bar-header">
                <div className="container-flex">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h2 className="">{title}</h2>
                        </div>
                        <div className="col-1 text-center align-middle">
                            <FontAwesomeIcon icon={icon} className="fa-2x" />
                            <br/>{iconTitle}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-flex">
                <div className="row">
                    <div className="col-1">
                        <button
                            className="prev"
                            onClick={(e) => {
                                e.preventDefault();
                                scroll(-1);
                            }}
                        >
                            &#10094;
                        </button>
                    </div>
                    <div className="image-container col-10">
                        {data && data.map((show, idx) => {
                            return (
                                <Link to={`/shows/${show.id}`}>
                                    <div className="image tile square col-xl-2 col-lg-3 col-md-4 col-6">
                                        <FontAwesomeIcon
                                            icon={faImage}
                                            className="fa-2x"
                                        />
                                        <p>{show.name}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="col-1">
                        <button
                            className="next"
                            onClick={(e) => {
                                e.preventDefault();
                                scroll(1);
                            }}
                        >
                            &#10095;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistSlider;
