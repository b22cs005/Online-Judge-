import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./Signup";
import Login from "./Login";
import UserNavbar from "./UserNavbar";
//import GoogleNavbar from "./GoogleNavbar";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Navbar = ({userData,setUserData}) => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/login/success", { withCredentials: true });
      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    window.open("http://localhost:4000/logout", "_self");
    setUserData({});
  };

  const toggleUserLogin = () => {
    setUserLogin(!userLogin);
  };

  const toggleModal1 = () => {
    setModal1(!modal1);
  };

  const toggleModal2 = () => {
    setModal2(!modal2);
  };

  const closeSignupModalAndOpenLoginModal = () => {
    setModal2(false);
    setModal1(true);
  };

  const closeLogInModalAndOpenSignUpModal = () => {
    setModal2(true);
    setModal1(false);
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
      containerId:"containerNavbar"
    });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
      containerId:"containerNavbar"
    });

  return (
    <>
      <nav className={styles.navbar}>
        {userLogin ? (
          <UserNavbar toggleUserLogin={toggleUserLogin} setUserData={setUserData} />
        ) : Object?.keys(userData)?.length > 0 ? (
          <>
            <span className={styles.homePage}>
              <img src="/default.svg" alt="Online Judge Logo" className={styles.logoGoogle} />
              <h4 className={styles.user}>
                {" "}
                Welcome <span>{userData?.displayName}</span>
              </h4>
              <button onClick={() => navigate('/')} className={styles.btnHome}>
              Home
            </button>
            <button className={styles.btnHome} onClick={()=>navigate('/profile')}>
              View Profile
            </button>
              <button className={styles.btnLogout} onClick={logout}>LOGOUT</button>
            </span>
          </>
        ) : (
          <div className={styles.homeNav}>
            <img src="/default.svg" alt="Online Judge Logo" className={styles.logo} />
            <button onClick={() => navigate('/')} className={styles.btnHome}>
              Home
            </button>
            <button onClick={toggleModal1} className={styles.btnModal1}>
              Log In
            </button>
            <button onClick={toggleModal2} className={styles.btnModal2}>
              Sign Up
            </button>
          </div>
        )}
      </nav>
      <Login
        modal1={modal1}
        toggleModal1={toggleModal1}
        handleError={handleError}
        handleSuccess={handleSuccess}
        closeLogInModalAndOpenSignUpModal={closeLogInModalAndOpenSignUpModal}
        toggleUserLogin={toggleUserLogin}
      />
      <Signup
        modal2={modal2}
        toggleModal2={toggleModal2}
        handleError={handleError}
        handleSuccess={handleSuccess}
        closeSignupModalAndOpenLoginModal={closeSignupModalAndOpenLoginModal}
      />
      <ToastContainer containerId={"containerNavbar"} />
    </>
  );
};

export default Navbar;
