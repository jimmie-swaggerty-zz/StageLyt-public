import React, { useState } from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";


const Slider = (props) => {
    const { divid, title, icon, iconTitle, children, childstyle, html, banner, exState, expandable, bottomBorder, counterhide } = props;
    const [expand, setExpand] = useState(expandable ? exState : true)
    const scroll = (direction) => {
        let far = ($(`#${divid} .image-container`).width() / 2) * direction;
        let pos = $(`#${divid} .image-container`).scrollLeft() + far;
        $(`#${divid} .image-container`).animate({ scrollLeft: pos }, 1000);
    };

    const toggle = () => {
        if (expandable) {
            if (expand) {
                setExpand(false)
            }
            else {
                setExpand(true)
            }
        }
    }

    return (
        <div className="main">
            {banner &&
                <div className={`text-center bg-purple p-3 px-3 text-white ${expandable && "btn"}`} type={expandable && "button"} onClick={toggle}>
                    <div className="container-fluid">
                        <div className="d-flex text-start align-middle">
                            <div className="col-1">
                                <div className="col align-middle d-flex justify-content-around">
                                    <FontAwesomeIcon icon={icon} className="fa-2x" />
                                    {children && !counterhide &&
                                        <span className="badge bg-light text-black rounded-pill">{children.length}</span>
                                    }
                                </div>
                            </div>
                            <div className="col text-center">
                                <h3 className="text-white">{title}</h3>
                            </div>
                            <div className="col-1 text-end">
                                <button className="btn btn-purple" onClick={e => { e.preventDefault(); toggle() }}>
                                    {expandable && <div className="col">
                                        {expand && <FontAwesomeIcon icon={faArrowUp} />}
                                        {!expand && <FontAwesomeIcon icon={faArrowDown} />}
                                    </div>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {expand && <div className="container-flex align-top">
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
            </div>}
            {bottomBorder && <div className="bg-purple" style={{ height: '10px' }}>
            </div>}
        </div>
    );
};

export default Slider;
