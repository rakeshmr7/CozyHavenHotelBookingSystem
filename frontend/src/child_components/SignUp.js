import { Input, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/SignUp.module.css";

const SignUp = ({ url }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  let [confPassword, setConfPassword] = useState("");
  let [passFlag, setPassFlag] = useState(false);

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (confPassword !== "") {
      if (user.password !== confPassword) setPassFlag(true);
      else setPassFlag(false);
    } else setPassFlag(false);
  }, [user.password, confPassword]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const register = () => {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.age ||
      !user.gender ||
      !user.email ||
      !user.password ||
      !user.contact ||
      !user.address
    ) {
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
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.status === "409 CONFLICT") {
          Modal.error({
            title: res.message,
            content: "User with this email already exists!!",
            okText: "OK",
            okButtonProps: {
              style: {
                backgroundColor: "#9C0A8F",
                borderColor: "#9C0A8F",
              },
            },
          });
        } else if (res.status === "201 CREATED") {
          Modal.success({
            title: "Success",
            content: res.message,
            okText: "OK",
            okButtonProps: {
              style: {
                backgroundColor: "#9C0A8F",
                borderColor: "#9C0A8F",
              },
            },
          });
          navigate("/signIn");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>CozyHaven</div>
        <div className={styles["nav-links"]}>
          <Link to="/">Home</Link>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles["left-content"]}>
            <h1>Welcom to CozyHaven</h1>
            <p> Join us and book your perfect stay with ease.</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.card}>
            <h2>Create Account</h2>
            <p>Fill your details to get started</p>
            <div className={styles.row}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>

            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
            />

            <select name="gender" onChange={handleChange} defaultValue="">
              <option value="" disabled>
                Select Gender
              </option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>

              <option value="Other">Other</option>
            </select>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            <Input.Password
              name="password"
              placeholder="Password"
              onChange={handleChange}
              style={{
                marginBottom: "12px",
                borderRadius: "10px",
                height: "45px",
              }}
            />

            <Input.Password
              placeholder="Confirm Password"
              onChange={(e) => setConfPassword(e.target.value)}
              style={{
                marginBottom: "12px",
                borderRadius: "10px",
                height: "45px",
              }}
            />
            {passFlag && (
              <h6 style={{ color: "red" }}>
                Confirm Password should be same as Password!!!
              </h6>
            )}

            <input
              type="text"
              name="contact"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />

            <button onClick={register} disabled={loading}>
              {loading ? (
                <Spin
                  size="small"
                  style={{
                    color: "white",
                  }}
                />
              ) : (
                "Create Account"
              )}
            </button>
            <div className={styles.link}>
              Already Registered? <Link to={"/signIn"}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
