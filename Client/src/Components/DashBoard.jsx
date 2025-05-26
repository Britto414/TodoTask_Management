import { useState } from "react";
import TaskCard from "./TaskCard";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Pencil } from "lucide";

const DashBoard = (props) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Filter tasks based on search input
  const pendigTasks = props.tasks.filter(task =>
    task.status==="Open"
  );

  

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
 
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Dashboard</h1>
          <p className="text-gray-600">
            {pendigTasks.length} {pendigTasks.length === 1 ? "task" : "tasks"} Not Completed
          </p>
        </div>

        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks by title or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            
          </div>
          <button
            onClick={()=> navigate('/add')}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
          >
            + Add New Task
          </button>
        </div>
        <div className="flex bg-grey-400 gap-2 mt-1 mb-4">
            <button className="border rounded-full px-4 py-2">pending</button>
            <button className="border rounded-full px-4 py-2">completed</button>
        </div>
        {props.tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {props.tasks.map((task) => (
                <div key={task._id}>
                    <TaskCard key={task._id} task={task} />
                </div>
              
              
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks found</h3>
            <p className="mt-1 text-gray-500">
              {search ? "Try a different search term" : "Create your first task by clicking 'Add New Task'"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;