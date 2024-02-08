import Home from "./Component/Home";
import Insurance from "./Component/Insurance";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/insurance" element={<Insurance />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
