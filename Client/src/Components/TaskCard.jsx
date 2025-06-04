
import dayjs from "dayjs";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task , onCheck , onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start  gap-4 bg-white rounded-xl shadow-md p-4 w-full max-w-2xl">
      
      <input
        type="checkbox"
        checked={task.status === "Complete"}
        onChange={() => onCheck(task._id)}
        className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 "
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
        <p className="text-xs text-gray-400 mt-2">
          Due: {dayjs(task.dueDate).format("MMM D, YYYY")}
        </p>
      </div>
        
      <div className="flex justify-end gap-3 mt-2">
        <FaEdit className="text-yellow-500 hover:text-yellow-600 cursor-pointer" onClick={()=> navigate('/edit' ,{ state:{task}})}  size={18} />
        <FaTrash className="text-red-500 hover:text-red-600 cursor-pointer" onClick={()=>onDelete(task._id)} size={18} />
      </div>
    </div>
  );
};

export default TaskCard;
