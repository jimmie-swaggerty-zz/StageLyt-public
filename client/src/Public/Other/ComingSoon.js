import React from 'react'
import logo from '../../Images/StageLyt-08.png'

const ComingSoon = () => {
    return (
        <div className="container align-middle d-flex bg-dark" style={{ minHeight: "100vh", minWidth: "100vw"}}>
            <div className="m-4 bg-dark align-middle justify-content-around" style={{ height: "100%" }}>
                <div className="">
                    <div className=""><h1 className="text-center text-white">Coming Soon</h1></div>
                    <div className=""><img src={logo} width="500px" /></div>
                </div>
            </div>
        </div>
    )
}

export default ComingSoon