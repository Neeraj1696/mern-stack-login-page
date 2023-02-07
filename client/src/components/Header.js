import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

function Header() {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();
  const handleLogout = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);
    console.log(logindata);

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
      // cookie remove for use credentials
    });

    const data = await res.json();
    // console.log(data);

    if (data.status === 201) {
      console.log("Error");
    } else {
      console.log("user Logout");
      setLoginData(false);
      history("/");
    }
  };

  return (
    <nav>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>

        <Link to="/logout">
          <button onClick={handleLogout}>Logout</button>
        </Link>
      </ul>
    </nav>
  );
}

export default Header;
