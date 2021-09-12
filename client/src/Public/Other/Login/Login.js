import React, {useContext} from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const Login = () => {
//   const handleLogin = async googleData => {
//     const res = await fetch("https://stagelyt-mysql.herokuapp.com/api/v1/auth/google", {
//       method: "POST",
//       body: JSON.stringify({
//         token: googleData.tokenId
//       }),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     const data = await res.json()
//     console.log(data)
//     console.log(data.userLoggedIn)
//     // store returned user somehow
//   }

  // const logout = () => {
  //   console.log("logged out")
  // }
  const handleLogin = (response) => {
    console.log(response)
  }

  const logout = (response) => {
    console.log(response)
  }


  return (
    <div className="container justify-content-around">
      <GoogleLogin
        clientId="883754731797-ob7426hf5nn8gei88kvm2po4nct6bqkl.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
        className="test"
        isSignedIn={true}
      />
      <GoogleLogout
        clientId="883754731797-ob7426hf5nn8gei88kvm2po4nct6bqkl.apps.googleusercontent.com"
        buttonText="Logout"
        onFailure={logout}
        onLogoutSuccess={logout}
      >
      </GoogleLogout>
    </div>
  );
};

export default Login;
