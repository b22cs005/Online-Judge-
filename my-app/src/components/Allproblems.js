import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from "axios";
import styles from './Allproblems.module.css';
import {useNavigate} from 'react-router-dom';

const Allproblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/problems');
        setProblems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problems:', error);
        setLoading(false);
      }
    }
    fetchProblems();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading problems...</p>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>All problems</h1>
      <button className={styles.createBtn} onClick={()=>navigate('/create-own-problem')}>Create Your Own Problem</button>
      <ul className={styles.problemsList}>
        {problems.map(problem => (
          <li key={problem.id} className={styles.problemCard}>
            <h2 className={styles.problemTitle}>{problem.title}</h2>
            <p className={styles.problemTopic}>Topic: {problem.topic}</p>
            <p className={styles.problemDifficulty}>Difficulty: {problem.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allproblems;
