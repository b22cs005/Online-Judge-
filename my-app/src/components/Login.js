import React, { useState } from "react";
import axios from "axios";
import styles from "./Navbar.module.css";
import GoogleIcon from '@mui/icons-material/Google';

const Login = ({ modal1, toggleModal1, handleError, handleSuccess, closeLogInModalAndOpenSignUpModal,toggleUserLogin}) => {
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/login", { ...loginValue }, { withCredentials: true });
      const { success, message} = data;
      if (success) {
        handleSuccess(message);
        toggleUserLogin();
        setTimeout(() => {
          toggleModal1();
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
    setLoginValue({
      email: "",
      password: "",
    });
  };

  const handleGoogleSignIn = () => {
    window.open("http://localhost:4000/auth/google/callback","_self");
  };

  return (
    modal1 && (
      <div className={styles.modal}>
        <div className={styles.overlay} onClick={toggleModal1}></div>
        <div className={styles.modalContent}>
          <form className={styles.loginForm}>
            <h3 className={styles.formElement}>Log In</h3>
            <input type="email" className={styles.formElement} placeholder="Email" name="email" value={email} onChange={handleChange} />
            <input type="password" className={styles.formElement} placeholder="Password" name="password" value={password} onChange={handleChange} />
            <button className={`${styles.formElement} ${styles.btn}`} onClick={handleLoginSubmit}>Login</button>
            <span className={styles.linking}>
              Not registered? <button type="button" className={styles.link} onClick={closeLogInModalAndOpenSignUpModal}>Sign Up</button>
            </span>
            <button type="button" className={`${styles.formElement} ${styles.googlebtn}`} onClick={handleGoogleSignIn}>
              <div className={styles.googlesignin}>
                <GoogleIcon className={styles.googleIcon} />
                <span>Sign In with Google</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default Login;
