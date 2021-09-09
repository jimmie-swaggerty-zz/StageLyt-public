import React, { useContext } from 'react'
import { store } from '../../../context/StateProvider'

import { GoogleLogout, GoogleLogin } from 'react-google-login'
// import GoogleLogin, { GoogleLogout } from '../dist/google-login'
// import FontAwesome from 'react-fontawesome';



const Login2 = () => {
    const globalStateAndDispatch = useContext(store)
    const globalState = globalStateAndDispatch.state
    console.log("global state: ", globalState)
    const globalDispatch = globalStateAndDispatch.dispatch
    console.log("global dispatch: ", globalDispatch)
    const clientId = "883754731797-ob7426hf5nn8gei88kvm2po4nct6bqkl.apps.googleusercontent.com"

    const success = async response => {
        const res = await fetch("http://localhost:8000/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: response.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
        console.log(data.userLoggedIn)
        // store returned user somehow

        globalDispatch({
            type: "sign-in",
            payload: data.userLoggedIn
        })
    }

    const error = response => {
        console.error(response) // eslint-disable-line
    }

    const loading = () => {
        console.log('loading') // eslint-disable-line
    }

    const logout = () => {
        console.log('logout') // eslint-disable-line
        globalDispatch({
            type: "sign-out"
        })
    }

    return (
        <div>
            {!globalState.loggedIn && <GoogleLogin onSuccess={success} onFailure={error} clientId={clientId} isSignedIn={true}/>}

            {globalState.loggedIn && <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={logout} />}
        </div>
    )
}

export default Login2