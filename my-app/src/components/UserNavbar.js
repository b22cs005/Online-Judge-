import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styles from "./UserNavbar.module.css";
import { useNavigate } from "react-router-dom";

const UserNavbar = ({ toggleUserLogin, setUserData }) => {
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        "http://localhost:4000/",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user.username);
      setUserData(user);
    };
    verifyCookie();
  }, [removeCookie]);

  const Logout = async() => {
    try {
      await axios.post(`http://localhost:4000/userlogout`, {}, { withCredentials: true });
      navigate("/");
      toggleUserLogin();
      setUserData({});
    }
    catch (error) {
      console.error("Failed to logout:", error);
    }

  };

  return (
    <div className={styles.homePage}>
      <img src="/default.svg" alt="Online Judge Logo" className={styles.logo} />
      <div className={styles.navContainer}>
        <button onClick={() => navigate('/')} className={styles.btnHome}>
          Home
        </button>
        <button className={styles.btnHome} onClick={() => navigate('/profile')}>
          Dashboard
        </button>
        <button className={styles.btnLogout} onClick={Logout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default UserNavbar;
