import { Modal, Spin } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../css/SignIn.module.css";
const SignIn = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let nav = useNavigate();

  const validate = () => {
    if (email === "" || password === "") {
      Modal.error({
        title: "Missing Fields",
        content: "Please fill all fields before submitting.",
        okText: "OK",
        okButtonProps: {
          style: {
            backgroundColor: "#9C0A8F",
            borderColor: "#9C0A8F",
          },
        },
      });
      return;
    }
    setLoading(true);
    fetch(`http://localhost:9090/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.status === "401 UNAUTHORIZED") {
          Modal.error({
            title: res.status,
            content: res.message,
            okText: "OK",
            okButtonProps: {
              style: {
                backgroundColor: "#9C0A8F",
                borderColor: "#9C0A8F",
              },
            },
          });
        } else if (res.status === "200 OK") {
          Modal.success({
            title: "Login Success!!",
            content: "Book your Choice and Comfort!!",
            okText: "OK",
            okButtonProps: {
              style: {
                backgroundColor: "#9C0A8F",
                borderColor: "#9C0A8F",
              },
            },
          });
          sessionStorage.setItem("currentUser",JSON.stringify(res.data));  
        let cuser = JSON.parse(sessionStorage.getItem("currentUser") );
          if (cuser.user.role === "OWNER") {
            nav("/ownerdash");
          } else if(cuser.user.role === "ADMIN") {
            nav("/admindash");
          }else{
            nav("/")
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className={style.navbar}>
        <div className={style.logo}>CozyHaven</div>
        <div className={style["nav-links"]}>
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.left}>
          <div className={style["left-content"]}>
            <h1>Welcome Back to CozyHaven</h1>
            <p>Book your perfect stay with comfort and ease.</p>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.card}>
            <h2>Sign In</h2>
            <p>Enter your credentials to continue</p>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={style["forgot-password"]}>
              <Link to={"/forgotPassword"}>Forgot password?</Link>
            </div>
            <button onClick={validate} disabled={loading}>
              {loading ? (
                <Spin
                  size="small"
                  style={{
                    color: "white",
                  }}
                />
              ) : (
                "Sign In"
              )}
            </button>
            <div className={style.link}>
              New user? <Link to={"/customerSignUp"}>Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
