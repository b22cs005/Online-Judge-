
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Allproblems from "./components/Allproblems";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Allproblems />} />
        <Route path='/create-own-problem' element={<createProblem/>}/>
      </Routes>
    </div>
  );
}

export default App;
