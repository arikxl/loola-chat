import { Routes, Route } from "react-router-dom";



import './App.css';
import Home from "./pages/Home";


function App() {
  return (
    <Routes>
      LOOLA
      <Route path="/" element={<Home />}/>
      {/* <Route path="/chats" element={<Home />}/> */}
    </Routes>
  );
}

export default App;
