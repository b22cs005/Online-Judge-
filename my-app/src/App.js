import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Allproblems from "./components/Allproblems";
import Navbar from './components/Navbar';
import CreateProblem from './components/CreateProblem.js';
import UpdateProblem from './components/UpdateProblem';
import GetProblemDesc from './components/ProblemSolving/GetProblemDesc';
import GetFilteredProblems from './components/GetFilteredProblems';
import UserProfile from './components/UserProfile';
import axios from "axios";

function App() {
  const [userData, setUserData] = useState({});

  /*const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/login/success", { withCredentials: true });
      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);*/
  

  return (
    <div className="App">
      <Navbar userData={userData} setUserData={setUserData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Allproblems userData={userData}/>} />
        <Route path='/create-own-problem' element={<CreateProblem/>}/>
        <Route path="/update-problem/:id" element={<UpdateProblem/>}/>
        <Route path="/solve-problem/:id" element={<GetProblemDesc userData={userData} />} />
        <Route path="/problems/:topic" element={<GetFilteredProblems/>}/>
        <Route path="/profile" element={<UserProfile userData={userData}/>}/>
      </Routes>
    </div>
  );
}

export default App;
