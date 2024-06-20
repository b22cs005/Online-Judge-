import React from 'react';
import styles from './Intro.module.css'; 
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import Animation from "./manOnLaptop.json";

const Intro = ({ userLogin, userData }) => {
  const navigate = useNavigate();

  const exploreProblems = () => {
    navigate('/problems');
  }

  return (
    <div className={styles.introdiv}>
    <section className={styles.intro}>
      <header>
        <h1>Welcome to Codehack</h1>
      </header>
      <p>An interactive platform for coding enthusiasts to solve problems and improve their skills.</p>
      <button className={styles.btn} onClick={exploreProblems}>Explore Problems</button>
    </section>
    <section className={styles.devimg}>
    <Lottie animationData={Animation} loop={true} className={styles.developer} />
      </section>
    </div>
  );
}

export default Intro;
