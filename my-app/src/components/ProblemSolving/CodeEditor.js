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
  py:`
# This is a simple Python program
print("Hello World!")`,
  /*java:`
  public class Main {
      public static void main(String[] args) {
          // Print "Hello World" to the console
          System.out.println("Hello World");
      }
  }'*/
};

function CodeEditor() {
  const [code, setCode] = useState(defaultCodes.cpp);
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  useEffect(() => {
    setCode(defaultCodes[language]);
  }, [language]);

  const handleSubmit = async () => {
    const payload = {
      language: language,
      code
    };

    try {
      const { data } = await axios.post('http://localhost:4000/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
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
        <button onClick={handleSubmit} type="button" className={styles.run}>
          Run
        </button>
      </div>
      {output &&
        <div className={styles.row}>
          <div className={styles.outputbox}>
            <p style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}>{output}</p>
          </div>
        </div>
      }
    </div>
  );
}

export default CodeEditor;
