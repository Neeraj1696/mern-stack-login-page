import React, { useState } from "react";

function Signup() {
  const [passwordShow, setPasswordShow] = useState(false);

  const [inputValues, setInputValues] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setval = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);

    setInputValues(() => {
      return {
        ...inputValues,
        [name]: value,
      };
    });
  };

  const addUsereData = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inputValues;

    if (fname === "") {
      alert("pls enter your name");
    } else if (email === "") {
      alert("pls enter your email");
    } else if (!email.includes("@")) {
      alert("pls enter valid email");
    } else if (password === "") {
      alert("enter your password");
    } else if (password.length < 6) {
      alert("pass must be 6 char");
    } else if (cpassword === "") {
      alert("pls fill cpass word not be blank");
    } else if (password !== cpassword) {
      alert(" pls type same password");
    } else {
      console.log("Ressgistration successfully done");

      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();
      console.log(res);
      if (res.status === 201) {
        alert("Registration successfully");
        setInputValues({
          ...inputValues,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (
    <div>
      <form action="http://localhost:5000/register">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="fname"
            id="name"
            value={inputValues.fname}
            onChange={setval}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={inputValues.email}
            onChange={setval}
          />
        </div>
        <div className="password-show">
          <label htmlFor="password">Password</label>
          <input
            type={!passwordShow ? "password" : "text"}
            placeholder="Password"
            name="password"
            id="password"
            value={inputValues.password}
            onChange={setval}
          />
          <input
            type="button"
            value={!passwordShow ? "Show" : "Hide"}
            onClick={() => setPasswordShow(!passwordShow)}
          />
        </div>
        <div>
          <label htmlFor="cpassword">Confirm</label>
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            id="cpassword"
            value={inputValues.cpassword}
            onChange={setval}
          />
        </div>
      </form>
      <button onClick={addUsereData}>SignUp</button>
      <p>
        have an account please ? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;
