import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from "axios";
import styles from './Allproblems.module.css';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Allproblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [filterTopic,setFilterTopic] = useState('All');
  const navigate = useNavigate();
  const updateProblem = (id) => {
    navigate(`/update-problem/${id}`);
  }
  const solveProblem = (id) => {
    navigate(`/solve-problem/${id}`);
  }
  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };
  
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

    
  const deleteProblem = async (id) => {
    try{
    const {data} = await axios.delete(`http://localhost:4000/problems/${id}`);
    const {success,message}=data;
    if(success){
      handleSuccess(message);
      setProblems(problems.filter(problem => problem._id !== id));
      setFilteredProblems(filteredProblems.filter(problem => problem._id !== id));
    }
    else{
      handleError(message);
    }
    }
    catch(error){
      if (error.response && error.response.data && error.response.data.errors) {
        handleError(error.response.data.errors.message);
      } else {
        handleError("An error occurred. Please try again.");
      }
    }
    
  }

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/problems');
        console.log(response.data);
        setProblems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problems:', error);
        setLoading(false);
      }
    }
    fetchProblems();
  }, []);
  useEffect(() => {
    let filteredProblems = [...problems]; 

  
  if (filterDifficulty !== "All") {
    filteredProblems = filteredProblems.filter(problem => problem.difficulty === filterDifficulty);
  }

  
  if (filterTopic !== "All") {
    filteredProblems = filteredProblems.filter(problem => problem.topic === filterTopic);
  }


  setFilteredProblems(filteredProblems);
  }, [problems, filterDifficulty,filterTopic]);

  if (loading) {
    return <p className={styles.loading}>Loading problems...</p>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>All problems</h1>
      <button className={styles.arrowBack}>  <ArrowBackIcon onClick={()=>navigate('/')}/></button>
      <div className={styles.createAndFilter}>
    <div><button className={styles.createBtn} onClick={()=>navigate('/create-own-problem')}>Create Your Own Problem</button></div>  
      <div className={styles.filterDifficulty}>
        <p className={styles.difficultyHeading}>Filter by Difficulty</p>
        <select className={styles.selectDifficulty} onChange={(e)=>setFilterDifficulty(e.target.value)}>
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className={styles.filterTopic}>
        <p className={styles.topicHeading}>Filter by Topic</p>
        <select className={styles.selectTopic} onChange={(e)=>setFilterTopic(e.target.value)}>
          <option value="All">All</option>
          <option value="Arrays">Arrays</option>
          <option value="Backtracking">Backtracking</option>
          <option value="Binary Search">Binary Search</option>
          <option value="Bit Manipulation">Bit Manipulation</option>
          <option value="Dynamic Programming">Dynamic Programming</option>
          <option value="Graphs">Graphs</option>
          <option value="Greedy Algorithm">Greedy Algorithm</option>
          <option value="Hashing">Hashing</option>
          <option value="Heaps and Maps">Heaps and Maps</option>
          <option value="Linked Lists">Linked Lists</option>
          <option value="Stacks and Queues">Stacks and Queues</option>
          <option value="Strings">Strings</option>
          <option value="Trees">Trees</option>
        </select>
      </div>
      </div>
      <ul className={styles.problemsList}>
        {filteredProblems.map(problem => (
          <li key={problem._id} className={styles.problemCard}>
            <button className={styles.problemTitle} onClick={()=>solveProblem(problem._id)}>{problem.title}</button>
            <p className={styles.problemTopic}>Topic: {problem.topic}</p>
            <p className={styles.problemDifficulty}>Difficulty: {problem.difficulty}</p>
            <button className={styles.deleteBtn} onClick={() => deleteProblem(problem._id)}>
            <DeleteIcon className="delete-icon"></DeleteIcon>
            </button>
            <button className={styles.deleteBtn} onClick={() => updateProblem(problem._id)}>
            <UpdateIcon className="delete-icon"></UpdateIcon>
            </button>
          </li>
        ))}
      </ul>
      <ToastContainer/>
    </div>
  );
};

export default Allproblems;
