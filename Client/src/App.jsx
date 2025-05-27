import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import DashBoard from "./Components/DashBoard";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/Edit";
import axios from "./api/axios";

function App() {
  const [tasks, setTask] = useState([]);

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handeleLogin = async (user, navigate) => {
    try {
      localStorage.removeItem("token");

      const res = await axios.post("/user/login", user);

      localStorage.setItem("token", res.data.token);
      setLoginError("");
      navigate("/home");
    } catch (err) {
      if (err.response) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError("Something went wrong");
      }
      // console.log(loginError);
    }
  };

  const handleRegister = async (user, navigate) => {
    try {
      const res = await axios.post("/user/register", user);

      console.log(res.data);
      navigate("/");
    } catch (err) {
      setRegisterError(err.response.data.message);
    }
  };

  const handleAdd = async (task, navigate) => {
    const token = localStorage.getItem("token");
    const response = await axios.post("/task/", task, {
      headers: {
        Authorization: `Bearer ${token}`, // attach JWT token
      },
    });
    const newtask = response.data.task;
    console.log(newtask);

    setTask([...tasks, newtask]);

    console.log("task added:", response.data);
    navigate("/home");
  };

  const handleCheckStatus = async (id) => {
    console.log(id);
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await axios.put(
        `/task/check/${id}`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      setTask((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, status: res.data.updated.status } : task
      )
    );
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async(id , task) => {
    try{
      const token  = localStorage.getItem("token");
      const res = await axios.put(`/task/${id}` , task,{
        headers: {
          Authorization: `Bearer ${token}`, // attach JWT token
        },
      }
    );
    
    const updated = res.data.updated;
    const filtered = tasks.filter((item)=> item._id !=id);

    setTask([...filtered , updated]);

    console.log(res);

    }catch(err){
      console.log(err);
    }
  };

  const handleDelete = async(id) => {
    const token = localStorage.getItem("token");

  try {
    await axios.delete(`/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Optionally update the local state after successful deletion
    setTask((task) => task.filter((c) => c._id !== id));
    console.log("Contact deleted");
  } catch (error) {
    console.error("Error deleting task:", error.response?.data?.message || error.message);
  }
  };


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:5000/api/task", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const retrievedContacts = response.data;
          console.log(retrievedContacts);

          if (retrievedContacts) setTask(retrievedContacts);
        }
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login handeleLogin={handeleLogin} loginError={loginError} />
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
              <DashBoard tasks={tasks} 
                handleCheckStatus={handleCheckStatus}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                />
            }
          />

          <Route path="/add" element={<AddTask handleAdd={handleAdd} />} />

          <Route path="/edit" element={<EditTask handleEdit={handleEdit}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
