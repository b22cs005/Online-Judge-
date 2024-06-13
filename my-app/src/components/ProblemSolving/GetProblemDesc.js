import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from './GetProblemDesc.module.css';
import CodeEditor from './CodeEditor';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GetProblemDesc = ({userData}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [problem, setProblem] = useState({
    title: "",
    topic: "",
    difficulty: "",
    description: "",
    constraints: [],
    inputFormat: "",
    outputFormat: "",
    examples: []
  });

  useEffect(() => {
    const getProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/problems/${id}`);
        const problem = response.data.p_by_id;
        setProblem(problem);
      } catch (error) {
        console.error("Error fetching problems", error);
      }
    };
    getProblem();
  }, [id]);

  const { title, topic, difficulty, description, constraints, inputFormat, outputFormat, examples } = problem;

  return (
    <div className={styles.container}>
      <div className={styles.problemDesc}>
        <ArrowBackIcon onClick={() => navigate("/problems")} />
        <h1>{title}</h1>
        <p><strong>Topic:</strong> {topic}</p>
        <p><strong>Difficulty:</strong> {difficulty}</p>
        <h2>Description</h2>
        <p>{description}</p>
        <h2>Constraints</h2>
        <ul className={styles.elementsList}>
          {constraints.map((constraint, index) => (
            <li className = {styles.constraint} key={index}>{constraint}</li>
          ))}
        </ul>
        <h2>Input Format</h2>
        <p>{inputFormat}</p>
        <h2>Output Format</h2>
        <p>{outputFormat}</p>
        <h2>Examples</h2>
        {examples.map((example, index) => (
          <div key={index}>
            <p><strong>Input:</strong></p>
            <ul className={styles.elementsList}>
              {example.input.map((input, i) => (
                <li className = {styles.input} key={i}>{input}</li>
              ))}
            </ul>
            <p><strong>Output:</strong> {example.output}</p>
          </div>
        ))}
      </div>
      <div className={styles.codeEditor}>
        <CodeEditor problemId={problem._id} userData={userData} />
      </div>
    </div>
  )
}

export default GetProblemDesc;
