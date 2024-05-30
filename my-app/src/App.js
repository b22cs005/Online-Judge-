
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Allproblems from "./components/Allproblems";
import Navbar from './components/Navbar';
import CreateProblem from './components/CreateProblem';
import UpdateProblem from './components/UpdateProblem';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Allproblems />} />
        <Route path='/create-own-problem' element={<CreateProblem/>}/>
        <Route path="/update-problem/:id" element={<UpdateProblem/>}/>
      </Routes>
    </div>
  );
}

export default App;
