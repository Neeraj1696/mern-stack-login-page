import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const history = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });
  const setval = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);

    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = inputVal;

    if (email === "") {
      alert("pls enter your email");
    } else if (!email.includes("@")) {
      alert("pls enter valid email");
    } else if (password === "") {
      alert("enter your password");
    } else if (password.length < 6) {
      alert("pass must be 6 char");
    } else {
      console.log("login successfully done");

      const data = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);
      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        history("/dash");
        setInputVal({
          ...inputVal,

          email: "",
          password: "",
        });
        alert("login successful");
      }
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={inputVal.email}
            name="email"
            onChange={setval}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type={!passwordShow ? "password" : "text"}
            placeholder="Password"
            id="password"
            name="password"
            value={inputVal.password}
            onChange={setval}
          />
          <input
            type="button"
            value={!passwordShow ? "Show" : "Hide"}
            onClick={() => setPasswordShow(!passwordShow)}
          />
        </div>
      </form>
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account ? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
