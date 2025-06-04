import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import DashBoard from "./Components/DashBoard";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/Edit";
import axios from "./api/axios";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const [tasks, setTask] = useState([]);
  const [reloadTasks, setReloadTasks] = useState(false); 

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [searchTerm , setSearchTerm] = useState("");
  const [searchTermRes , setSearchTermRes] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/task", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [reloadTasks]);

  const handleSearch = (term)=>{
    const search = term.toLowerCase().trim();
    setSearchTerm(search);

    if (search !== "") {
    const filtered = tasks.filter((item) => {
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.includes(search)
      );
    });
    setSearchTermRes(filtered);
  } else {
    setSearchTermRes([]);
  }
  }

  const handeleLogin = async (user, navigate) => {
    try {
      localStorage.removeItem("token");
      const res = await axios.post("/user/login", user);
      localStorage.setItem("token", res.data.token);
      setLoginError("");
      setReloadTasks((prev) => !prev); 
      navigate("/home");
    } catch (err) {
      setLoginError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleRegister = async (user, navigate) => {
    try {
      await axios.post("/user/register", user);
      navigate("/");
    } catch (err) {
      setRegisterError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleAdd = async (task, navigate) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/task", task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReloadTasks((prev) => !prev);
      navigate("/home");
    } catch (err) {
      console.error("Add task error:", err);
    }
  };

  const handleCheckStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`/task/check/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTask((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, status: res.data.updated.status } : task
        )
      );
    } catch (err) {
      console.error("Check status error:", err);
    }
  };

  const handleEdit = async (id, taskData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/task/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReloadTasks((prev) => !prev);
    } catch (err) {
      console.error("Edit task error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReloadTasks((prev) => !prev);
    } catch (err) {
      console.error("Delete task error:", err);
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login handeleLogin={handeleLogin} loginError={loginError} setReloadTasks={setReloadTasks}/>
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                registerError={registerError}
              />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <DashBoard
                  tasks={searchTerm.length>=1 ? searchTermRes:tasks}
                  searchTerm={searchTerm}
                  handleSearch={handleSearch}
                  handleCheckStatus={handleCheckStatus}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddTask handleAdd={handleAdd} />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit"
            element={
              <PrivateRoute>
                <EditTask handleEdit={handleEdit} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
