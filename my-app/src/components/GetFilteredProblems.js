import React,{useEffect,useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import axios from "axios";
import styles from './Allproblems.module.css';


const GetFilteredProblems = () => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [problems,setProblems]=useState([]);

  const solveProblem = (id) => {
    navigate(`/solve-problem/${id}`);
  }

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/problems'); 
        let problems = response.data;
        if(topic==="All problems"){
            setProblems(response.data);
        }
        else{
            setProblems(problems.filter(problem=>problem.topic===topic));
        }
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    }
    fetchProblems();
  }, [topic]);
  return (
    <div className={styles.container}>
        <h1 className={styles.header}>{topic}</h1>
         <ul className={styles.problemsList}>
        {problems.map(problem => (
          <li key={problem._id} className={styles.problemCard}>
            <button className={styles.problemTitle} onClick={()=>solveProblem(problem._id)}>{problem.title}</button>
            <p className={styles.problemTopic}>Topic: {problem.topic}</p>
            <p className={styles.problemDifficulty}>Difficulty: {problem.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GetFilteredProblems