import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login'
import Register from './Components/Register';
import DashBoard from './Components/DashBoard'
import AddTask from './Components/AddTask';


function App() {
  const [tasks , setTask] =useState([
  {
    _id: "1",
    title: "Finish React login page",
    description: "Implement manual login with JWT and connect to backend.",
    dueDate: "2025-05-27",
    status: "Open",
    userId: "user123",
  },
  {
    _id: "2",
    title: "Design task dashboard",
    description: "Add search and add task features with Tailwind styling.Add search and add task features with Tailwind styling.Add search and add task features with Tailwind styling.",
    dueDate: "2025-05-28",
    status: "Open",
    userId: "user123",
  },
  {
    _id: "3",
    title: "Record Loom video",
    description: "Demo project and explain the flow for hackathon submission.",
    dueDate: "2025-05-28",
    status: "Complete",
    userId: "user123",
  },
]);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element = {
              <Login/>
            }
          
          />
          <Route
            path="/signup"
            element = {
              <Register/>
            }
          
          />
          <Route
            path="/home"
            element = {
              <DashBoard tasks={tasks}
              />
            }
          
          />


          <Route
            path="/add"
            element = {
              <AddTask
              />
            }
          
          />

      
        </Routes>
      </Router>
    </div>
  )
}

export default App
