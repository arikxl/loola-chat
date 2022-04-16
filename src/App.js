import { Routes, Route } from "react-router-dom";



import './App.css';
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <Routes>
      LOOLA
      <Route path="/" element={<HomePage />}/>
      <Route path="/chats" element={<ChatPage />}/>
    </Routes>
  );
}

export default App;
