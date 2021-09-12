import React from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const PagesSlider = (props) => {
    const { divid, data, title, icon, iconTitle, children, childstyle } = props;
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
                        <div className="col-4"></div>
                        <div className="col-4">
                            <h2 className="">{title}</h2>
                        </div>
                        <div className="col-4 text-center align-middle">
                            <FontAwesomeIcon icon={icon} className="fa-2x" />
                            <br />{iconTitle}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-flex align-top">
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

                        {children && children.map((child, idx) => {
                            return (
                                <div className={`image tile ${childstyle}`}>
                                    {child}
                                </div>
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

export default PagesSlider;
