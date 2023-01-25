import React, { useState } from "react";

function Login() {
  const [passwordShow, setPasswordShow] = useState(false);
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });
  const setval = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = inputVal;

    if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Please enter valid email");
    } else if (password === "") {
      alert("Please enter your password");
    } else if (password.length < 6) {
      alert("pass must be 6 char");
    } else {
      console.log("login successfully");
    }
  };

  return (
    <div>
      <form action="">
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
        Don't have an account ? <a href="/signup">Register</a>
      </p>
    </div>
  );
}

export default Login;
