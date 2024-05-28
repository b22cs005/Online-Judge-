import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styles from "./UserNavbar.module.css";
import { useNavigate } from "react-router-dom";

const UserNavbar = ({toggleUserLogin}) => {
    const [cookies,removeCookie]=useCookies([]);
    const [username,setUsername]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const verifyCookie = async () =>{
        const {data} = await axios.post(
            "http://localhost:4000",
            {},
            {withCredentials:true}
        );
        const {status,user}=data;
        setUsername(user);
    };
    verifyCookie();
    },[cookies,toggleUserLogin,removeCookie]);
    const Logout = () => {
        removeCookie("token");
        toggleUserLogin();
      };
      return (
        <>
          <span className={styles.homePage}>
            <img src="/default.svg" alt="Online Judge Logo" className={styles.logo}/>
            <h4 className={styles.user}>
              {" "}
              Welcome <span>{username}</span>
            </h4>
            <button onClick={() => navigate('/')} className={styles.btnHome}>
              Home
            </button>
            <button className={styles.btnLogout} onClick={Logout}>LOGOUT</button>
          </span>
        </>
      );
};
export default UserNavbar;