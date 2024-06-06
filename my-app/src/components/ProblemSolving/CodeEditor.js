import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios';
import styles from './GetProblemDesc.module.css';

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

function CodeEditor({ problemId }) {
  const [code, setCode] = useState(defaultCodes.cpp);
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [option, setOption] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  useEffect(() => {
    setCode(defaultCodes[language]);
  }, [language]);

  const handleRunCustomInput = async () => {
    const payload = {
      language: language,
      code,
      input
    };
    try {
      const { data } = await axios.post('http://localhost:4000/run', payload);
      console.log(data);
      setOutput(data.output);
      console.log(data.output);
    } catch (error) {
      console.log(error.response);
    }
  }

  const handleSubmitCode = async () => {
    setOption('');
    setOutput('');
    const payload = {
      language: language,
      code
    };
    try {
      const { data } = await axios.post(`http://localhost:4000/submit/${problemId}`, payload);
      setSuccess(data.success);
      setMessage(data.success ? 'Code passed all hidden test cases successfully!' : 'Code failed some hidden test cases.');
    } catch (error) {
      console.log(error.response);
      setSuccess(false);
      setMessage('An error occurred while submitting the code.');
    }
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const handleOptionChange = (selectedOption) => {
    setOption(selectedOption);
    setMessage('');
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h1 className={styles.name}>AlgoU Online Code Compiler</h1>
      </div>
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
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              outline: 'none',
              border: 'none',
              backgroundColor: '#f7fafc',
              height: '100%',
              overflowY: 'auto'
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <button 
          onClick={() => handleOptionChange('runCustomInput')} 
          type="button" 
          className={`${styles.run} ${styles.runCustomInput}`}
        >
          Run Custom Input
        </button>
        <button 
          onClick={handleSubmitCode} 
          type="button" 
          id={styles.hidden}
          className={styles.run}
        >
          Run on Hidden Test Cases
        </button>
      </div>
      {option === 'runCustomInput' && (
        <>
          <div className={styles.row}>
            <h3 className={styles.inputHeading}>Input</h3>
            <textarea 
              className={styles.outputbox} 
              placeholder="Enter your input here..."
              rows="5"
              cols="50"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.row}>
            <button onClick={handleRunCustomInput} type="button" className={styles.run}>
              Run
            </button>
          </div>
        </>
      )}
      {output && (
        <div className={styles.row}>
          <h3 className={styles.inputHeading}>Output</h3>
          <div className={styles.outputbox}>
            <div style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              whiteSpace: 'pre-wrap', 
              height: 'auto', 
              minHeight: '200px', 
              overflowY: 'auto' 
            }}>
              {output}
            </div>
          </div>
        </div>
      )}
      {message && (
        <div className={styles.row}>
          <div className={styles.messageBox} style={{ backgroundColor: success ? '#d4edda' : '#f8d7da' }}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
