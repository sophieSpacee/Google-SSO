import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const onGoogleSuccess = (response) => {
    const access_token = response.accessToken;
    const body = { access_token };
    fetch(process.env.REACT_APP_URL_API_LOGIN + "/auth/google", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((res) => {
        const { user, token } = res;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/dashboard");
      })
      .catch((error) => console.error("Error", error));
  };
  const onGoogleFailure = (err) => {
    console.log(err);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Sign in with Google"
      onSuccess={onGoogleSuccess}
      onFailure={onGoogleFailure}
      className="google-login-button"
    />
  );
};
export default Login;
