import React, { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './CreateProblem.module.css';
import {useNavigate,useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateProblemForm = () => {
  const navigate = useNavigate();
  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
      containerId:"containerUpdate"
    });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
      containerId:"containerUpdate"
    });
  const {id} = useParams();
  const [problem, setProblem] = useState({
    title: "",
    topic: "",
    difficulty: "",
    description: "",
    constraints: [],
    inputFormat: "",
    outputFormat: "",
    examples: [],
    testCasesCpp:[],
    testCasesPy:[]
  });

  useEffect(()=>{
    const getProblem = async () => {
      try{
        const response = await axios.get(`http://localhost:4000/problems/${id}`);
        console.log("response",response.data.p_by_id);
        const problem = response.data.p_by_id;
        setProblem(problem);
      }
      catch(error){
        console.error("Error fetching problems",error);
      }
    };
    getProblem();
  },[id]);

  console.log(problem.testCasesCpp);

  const {title, topic, difficulty, description, constraints, inputFormat, outputFormat, examples,testCasesCpp,testCasesPy} = problem;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({ ...prevProblem, [name]: value }));
  };

  const handleAddTestCase = (type) => {
    setProblem((prevProblem) => ({
      ...prevProblem,
      [type]: [...prevProblem[type], { Input: "", Output: "" }]
    }));
  };

  const handleDeleteTestCase = (type, index) => {
    setProblem((prevProblem) => ({
      ...prevProblem,
      [type]: prevProblem[type].filter((_, i) => i !== index)
    }));
  };

  const handleTestCaseInputChange = (type, index, field, value) => {
    const newTestCases = [...problem[type]];
    newTestCases[index][field] = value;
    setProblem((prevProblem) => ({ ...prevProblem, [type]: newTestCases }));
  };

  const handleAddConstraint = () => {
    setProblem((prevProblem) => ({
      ...prevProblem,
      constraints: [...prevProblem.constraints, ""],
    }));
  };

  const handleDeleteConstraint = (index) => {
    setProblem((prevProblem)=>({
      ...prevProblem,
      constraints:prevProblem.constraints.filter((_,i)=>i!==index),
    }));
  };

  const handleConstraintChange = (index, value) => {
    const newConstraints = [...problem.constraints];
    newConstraints[index] = value;
    setProblem((prevProblem) => ({ ...prevProblem, constraints: newConstraints }));
  };

  const handleAddExample = () => {
    setProblem((prevProblem) => ({
      ...prevProblem,
      examples: [...prevProblem.examples, { input: [], output: "" }]
    }));
  };

  const handleDeleteExample = (index) => {
    setProblem((prevProblem)=>({
      ...prevProblem,
      examples:prevProblem.examples.filter((_,i)=>i!==index),
    }));
  };

  const handleExampleChange = (index, field, value) => {
    const newExamples = problem.examples.map((example, i) =>
      i === index ? { ...example, [field]: value } : example
    );
    setProblem((prevProblem) => ({ ...prevProblem, examples: newExamples }));
  };

  const handleAddExampleInput = (index) => {
    const newExamples = problem.examples.map((example, i) =>
      i === index
        ? { ...example, input: [...example.input, ""] }
        : example
    );
    setProblem((prevProblem) => ({ ...prevProblem, examples: newExamples }));
  };

  const handleDeleteExampleInput = (exampleIndex, inputIndex) => {
    const newExamples = problem.examples.map((example, i) =>
      i === exampleIndex
        ? { ...example, input: example.input.filter((_, j) => j !== inputIndex) }
        : example
    );
    setProblem((prevProblem) => ({ ...prevProblem, examples: newExamples }));
  };

  const handleExampleInputChange = (exampleIndex, inputIndex, value) => {
    const newExamples = problem.examples.map((example, i) =>
      i === exampleIndex
        ? {
            ...example,
            input: example.input.map((input, j) =>
              j === inputIndex ? value : input
            )
          }
        : example
    );
    setProblem((prevProblem) => ({ ...prevProblem, examples: newExamples }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:4000/problems/${id}`, { ...problem });
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/problems');
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
    setProblem({
      title: "",
      topic: "",
      difficulty: "",
      description: "",
      constraints: [],
      inputFormat: "",
      outputFormat: "",
      examples: [],
      testCasesCpp:[],
      testCasesPy:[]
    });
  };

  return (
    <div className={styles.pageContainer}>
    <h2>Create Your Own Problem</h2>
  <button className={styles.arrowBack}>  <ArrowBackIcon onClick={()=>navigate('/problems')}/></button>
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={title} onChange={handleChange} required />
        </div>
        <div>
          <label>Topic:</label>
          <input type="text" name="topic" value={topic} onChange={handleChange} required />
        </div>
        <div>
          <label>Difficulty:</label>
          <input type="text" name="difficulty" value={difficulty} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={description} onChange={handleChange} required />
        </div>
        <div>
          <label>Input Format:</label>
          <textarea name="inputFormat" value={inputFormat} onChange={handleChange} required />
        </div>
        <div>
          <label>Output Format:</label>
          <textarea name="outputFormat" value={outputFormat} onChange={handleChange} required />
        </div>
        <div>
          <label>Constraints:</label>
          {constraints.map((constraint, index) => (
            <div key={index} className={styles.inputBox}>
              <input
                type="text"
                value={constraint}
                onChange={(e) => handleConstraintChange(index, e.target.value)}
                required
              />
              <button className={styles.cross} onClick={()=>handleDeleteConstraint(index)}>&#10060;</button>
            </div>
          ))}
          <button type="button" onClick={handleAddConstraint} className={styles.btn}>Add Constraint</button>
        </div>
        <div>
          <label>Examples:</label>
          {examples.map((example, index) => (
            <div key={index} className={styles.exampleContainer}>
              <div>
                <label>Inputs:</label>
                <div className={styles.exampleInputs}>
                  {example.input.map((input, i) => (
                    <div className={styles.inputBox}>
                    <input
                      key={i}
                      type="text"
                      value={input}
                      onChange={(e) => handleExampleInputChange(index, i, e.target.value)}
                      required
                    />
                    <button className={styles.cross} onClick={()=>handleDeleteExampleInput(index,i)}>&#10060;</button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => handleAddExampleInput(index)} className={styles.btn}>Add Input</button>
              </div>
              <div>
                <label>Output:</label>
                <input
                  type="text"
                  value={example.output}
                  onChange={(e) => handleExampleChange(index, "output", e.target.value)}
                  required
                />
              </div>
              <button className={styles.cross} onClick={()=>{handleDeleteExample(index)}}>&#10060;</button>
            </div>
          ))}
          <button type="button" onClick={handleAddExample} className={styles.btn}>Add Example</button>
        </div>
        <div>
          <label>Test Cases for C++:</label>
          {testCasesCpp.map((testCase, index) => (
            <div key={index}>
              <textarea
                value={testCase.Input}
                onChange={(e) => handleTestCaseInputChange('testCasesCpp', index, 'Input', e.target.value)}
                placeholder="Input"
              />
              <textarea
                value={testCase.Output}
                onChange={(e) => handleTestCaseInputChange('testCasesCpp', index, 'Output', e.target.value)}
                placeholder="Output"
              />
              <button type="button" className={styles.cross} onClick={() => handleDeleteTestCase('testCasesCpp', index)}>&#10060;</button>
            </div>
          ))}
          <button type="button" className={styles.btn} onClick={() => handleAddTestCase('testCasesCpp')}>Add Test Case</button>
        </div>
        <div>
          <label>Test Cases for Python:</label>
          {testCasesPy.map((testCase, index) => (
            <div key={index} >
              <textarea
                value={testCase.Input}
                onChange={(e) => handleTestCaseInputChange('testCasesPy', index, 'Input', e.target.value)}
                placeholder="Input"
              />
              <textarea
                value={testCase.Output}
                onChange={(e) => handleTestCaseInputChange('testCasesPy', index, 'Output', e.target.value)}
                placeholder="Output"
              />
              <button type="button" className={styles.cross} onClick={() => handleDeleteTestCase('testCasesPy', index)}>&#10060;</button>
            </div>
          ))}
          <button type="button" className={styles.btn} onClick={() => handleAddTestCase('testCasesPy')}>Add Test Case</button>
        </div>
        <button type="submit" className={styles.btn}>Submit</button>
      </form>
    </div>
    <ToastContainer containerId={"containerCreate"}/>
  </div> 
);
};

export default UpdateProblemForm;
