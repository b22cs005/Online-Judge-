import React from 'react'
import Navbar from './Navbar';
import Intro from './Intro';
import ProblemsbyTopic from './ProblemsbyTopic';

const Home = () => {
    return (
      <div className="Home">
        <Intro />
        <ProblemsbyTopic />
      </div>
    );
  }
  
  export default Home;