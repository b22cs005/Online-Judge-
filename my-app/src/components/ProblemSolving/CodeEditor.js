import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import styles from './GetProblemDesc.module.css'; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const defaultCodes = {
  cpp: `
  // Include the input/output stream library
  #include <iostream> 

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`,
  c: `
  #include <stdio.h>

  int main() {
      // Print "Hello World" to the console
      printf("Hello World\\n");
      
      // Return 0 to indicate successful execution
      return 0;
  }`,
  py: `
# This is a simple Python program
print("Hello World!")`,
};

function CodeEditor({ problemId, userData }) {
  const [code, setCode] = useState(defaultCodes.cpp);
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState('');
  const [display, setDisplay] = useState(''); 
  const [success, setSuccess] = useState(null);

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
      containerId: "containerAddToUser"
    });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
      containerId: "containerAddToUser"
    });

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  useEffect(() => {
    setCode(defaultCodes[language]);
  }, [language]);

  const handleRunCode = async () => {
    const payload = {
      language: language,
      code,
      input
    };
    try {
      const { data } = await axios.post('https://compiler.codehack.me/run', payload);
      setOutput(data.output);
      setDisplay('run');
    } catch (error) {
      if (error.response.status === 400) {
        setOutput(`Compilation Error: ${error.response.data.message}`);
        setDisplay('run');
      }
    }
  }

  const handleSubmitCode = async () => {
    const payload = {
      language: language,
      code
    };
    try {
      const { data } = await axios.post(`https://compiler.codehack.me/submit/${problemId}`, payload);
      setSuccess(data.success);
      setVerdict(data.success ? 'Code passed all hidden test cases successfully!' : 'Code failed some hidden test cases.');
      setDisplay('submit');
    } catch (error) {
      setSuccess(false);
      setVerdict('An error occurred while submitting the code.');
      setDisplay('submit');
    }
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const handleAddInUser = async () => {
    if (!userData || Object.keys(userData).length === 0) {
      alert("Please login or signup first!");
    } else {
      try {
        const { data } = await axios.post(`https://backend.codehack.me/addProblemInUser`, {
          userId: userData._id,
          problemId: problemId
        })
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
  };

  return (
    <div className={styles.container2}>
      <div className={styles.row}>
        <select className={styles.selectBox} onChange={handleLanguageChange} value={language}>
          <option value='cpp' className={styles.option}>C++</option>
          <option value='c' className={styles.option}>C</option>
          <option value='py' className={styles.option}>Python</option>
        </select>
      </div>
      <div className={styles.row}>
        <div className={styles.editor}>
          <Editor
            width="100%"
            height="300px"
            language={language === 'py' ? 'python' : language === 'c' ? 'c' : 'cpp'}
            theme="vs-dark"
            value={code}
            options={options}
            onChange={(newValue) => setCode(newValue)}
          />
        </div>
      </div>
      <div className={`${styles.row} ${styles.buttonAlign}`}>
        <button
          onClick={() => setDisplay('console')}
          type="button"
          className={styles.run}
        >
          Console
        </button>
        <button
          onClick={handleRunCode}
          type="button"
          className={styles.run}
        >
          Run
        </button>
        <button
          onClick={handleSubmitCode}
          type="button"
          className={styles.run}
        >
          Submit
        </button>
      </div>
      <div className={styles.row}>
        {display === 'console' && (
          <div>
            <h3 className={styles.inputHeading}>Input</h3>
            <textarea
              className={styles.outputbox}
              placeholder="Enter your input here..."
              rows="5"
              cols="50"
              onChange={handleInputChange}
            />
          </div>
        )}
        {display === 'run' && (
          <div>
            <h3 className={styles.inputHeading}>Output</h3>
            <div className={styles.outputbox}>
              <div style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                whiteSpace: 'pre-wrap',
                height: 'auto',
                minHeight: '100px',
                overflowY: 'auto'
              }}>
                {output}
              </div>
            </div>
          </div>
        )}
        {display === 'submit' && (
          <div>
            <h3 className={styles.inputHeading}>Verdict</h3>
            <div className={styles.messageBox} style={{ backgroundColor: success ? '#d4edda' : '#f8d7da' }}>
              <p>{verdict}</p>
              {success && (
                <button onClick={handleAddInUser} className={styles.run} style={{ marginTop: '10px' }}>
                  Add to My Problems
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer containerId={"containerAddToUser"} />
    </div>
  );
}

export default CodeEditor;
