import React, { useState } from "react";
import axios from "axios";
import styles from "./Navbar.module.css";

const Signup = ({ modal2, toggleModal2, handleError, handleSuccess, closeSignupModalAndOpenLoginModal }) => {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    cnf_password: "",
    email: "",
  });

  const { username, password, cnf_password, email } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://backend.codehack.me/signup", { ...inputValue }, { withCredentials: true });
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          toggleModal2();
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        handleError(error.response.data.errors.message);
      } else {
        handleError("An error occurred. Please try again.");
      }
    }
    setInputValue({
      username: "",
      password: "",
      cnf_password: "",
      email: "",
    });
  };

  return (
    modal2 && (
      <div className={styles.modal}>
        <div className={styles.overlay} onClick={toggleModal2}></div>
        <div className={styles.modalContent}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h3 className={styles.formElement}>Sign Up</h3>
            <input type="text" className={styles.formElement} placeholder="Username" name="username" value={username} onChange={handleChange} />
            <input type="password" className={styles.formElement} placeholder="Password" name="password" value={password} onChange={handleChange} />
            <input type="password" className={styles.formElement} placeholder="Confirm Password" name="cnf_password" value={cnf_password} onChange={handleChange} />
            <input type="email" className={styles.formElement} placeholder="E-mail Address" name="email" value={email} onChange={handleChange} />
            <button className={`${styles.formElement} ${styles.btn}`}>Sign Up</button>
            <span>
              Already have an account? <button type="button" className={styles.link} onClick={closeSignupModalAndOpenLoginModal}>Login</button>
            </span>
          </form>
        </div>
      </div>
    )
  );
};

export default Signup;
