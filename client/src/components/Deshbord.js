import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

function Deshbord() {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();
  // console.log(logindata.ValidUserOne.email);

  const DeshbordValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    // console.log(data);

    if (data.status === 401 || !data) {
      history("*");
    } else {
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    DeshbordValid();
  }, []);

  return (
    <div>
      <h1>Deshbord Page</h1>
      {/* <h2>User:{logindata.ValidUserOne.email}</h2> */}
    </div>
  );
}

export default Deshbord;
