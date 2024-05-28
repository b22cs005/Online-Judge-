import React from 'react'
import './Intro.css'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Intro = ({userLogin,userData}) => {
const navigate = useNavigate();
  const exploreProblems = () =>{
     navigate('/problems');
  }
  return (
    <section className="intro">
    <header>
      <h1>Welcome to Codehack</h1>
    </header>
    <p>An interactive platform for coding enthusiasts to solve problems, improve skills, and compete with others.</p>
    <button className="btn" onClick={exploreProblems}>Explore Problems</button>
  </section>
  );
}

export default Intro