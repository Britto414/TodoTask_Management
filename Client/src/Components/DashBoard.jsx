import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { useNavigate, Link } from "react-router-dom";
import { TbMoodEmpty } from "react-icons/tb";
import dayjs from "dayjs";

const DashBoard = (props) => {
  const [filter, setFilter] = useState("All");
  const [filteredTask, setFilteredTask] = useState(props.tasks);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const pendingTasks = props.tasks.filter((task) => task.status === "Open");

  const handleFilter = (status) => {
    if (status === "Pending") {
      setFilteredTask(props.tasks.filter((task) => task.status === "Open"));
    } else if (status === "Completed") {
      setFilteredTask(props.tasks.filter((task) => task.status === "Complete"));
    } else {
      setFilteredTask(props.tasks);
    }
  };

  const groupTasksByDate = (tasks) => {
  return tasks.reduce((groups, task) => {
    const date = dayjs(task.dueDate).format("MMMM D, YYYY");
    if (!groups[date]) groups[date] = [];
    groups[date].push(task);
    return groups;
    }, {});
  };

  

  useEffect(() => {
    setFilteredTask(props.tasks);
  }, [props.tasks]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="relative flex items-center justify-between mb-6 px-4 py-3">
            <div className="w-20 invisible"></div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mx-auto">
              Task Dashboard
            </h1>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition
               text-sm sm:text-base w-22"
            >
              Log Out
            </button>
          </div>

          {pendingTasks.length >= 1 && (
            <p className="text-gray-600">
              {pendingTasks.length}{" "}
              {pendingTasks.length === 1 ? "task" : "tasks"} not completed
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              value={props.searchTerm}
              onChange={(e) => props.handleSearch(e.target.value)}
              placeholder="Search tasks by title or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          <button
            onClick={() => navigate("/add")}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
          >
            + Add New Task
          </button>
        </div>
        <div className="flex bg-gray-100 p-1 gap-2 rounded-full w-max">
          {["All", "Pending", "Completed", "Group by Date"].map((status) => (
            <button
              key={status}
              onClick={() => {
                handleFilter(status);
                setFilter(status);
              }}
              className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
                filter === status
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {filter === "Group by Date" ? (
          Object.entries(groupTasksByDate(filteredTask)).sort(([a], [b]) => new Date(a) - new Date(b)).map(([date, tasks]) => (
              <div key={date} className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-black mb-2">
                   {date}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onCheck={(id) => props.handleCheckStatus(id)}
                      onDelete={(id) => props.handleDelete(id)}
                      
                    />
                  ))}
                </div>
              </div>
            )
          )
        ) : filteredTask.length > 0 ? (
          <div className="grid grid-cols-1 mt-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTask.map((task) => (
              <div key={task._id}>
                <TaskCard
                  key={task._id}
                  task={task}
                  onCheck={(id) => props.handleCheckStatus(id)}
                  onDelete={(id) => props.handleDelete(id)}
                  onEdit={() => handleEdit()}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <TbMoodEmpty size={48} className="mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No tasks found
            </h3>
            <p className="mt-1 text-gray-500">
              {search
                ? "Try a different search term"
                : "Create your first task by clicking 'Add New Task'"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
