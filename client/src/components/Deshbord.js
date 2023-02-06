import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Deshbord() {
  const history = useNavigate();

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
      history("/dash");
    }
  };

  useEffect(() => {
    DeshbordValid();
  }, []);

  return (
    <div>
      <h1>Deshbord Page</h1>
      <h4>User Email</h4>
    </div>
  );
}

export default Deshbord;
