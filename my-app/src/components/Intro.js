import React from 'react';
import styles from './Intro.module.css'; 
import { useNavigate } from 'react-router-dom';

const Intro = ({ userLogin, userData }) => {
  const navigate = useNavigate();

  const exploreProblems = () => {
    navigate('/problems');
  }

  return (
    <section className={styles.intro}>
      <header>
        <h1>Welcome to Codehack</h1>
      </header>
      <p>An interactive platform for coding enthusiasts to solve problems, improve skills, and compete with others.</p>
      <button className={styles.btn} onClick={exploreProblems}>Explore Problems</button>
    </section>
  );
}

export default Intro;
