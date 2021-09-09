import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = (props) => {
    const { icon, title, count } = props
    return (
        <div className="text-center bg-purple p-2 text-white">
            <div className="container-flex">
                <div className="col-12">
                    <div className="text-center bg-purple p-2 text-white">
                        <div className="container-flex">
                            <div className="col d-flex align-middle">
                                <div className="col-1">
                                    <FontAwesomeIcon icon={icon} className="fa-2x" />
                                </div>
                                <div className="col text-center">
                                    <h3 className="text-white">{title}</h3>
                                </div>
                                <div className="col-1"><span className="badge bg-light text-black rounded-pill">{count}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header