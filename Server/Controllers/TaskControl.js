const Task = require('../Models/TaskSchema')
// const User = require("../models/UserSchema")
const mongoose = require('mongoose');

const asyncHandler = require('express-async-handler')

const getTasks = asyncHandler(async(req, res) => {
     if (req.headers.Authorization) {
        res.status(404) 
        throw new Error("Token Not Found" );
    }
    
    const tasks = await Task.find({ user_id: req.user.id });
    
    if (tasks.length === 0) {
        return res.status(200).json({Message:"No task Found"})
    }
    res.status(200).json(tasks);
});

 
const CreateTask = asyncHandler(async(req, res) => {
    const { title , description , dueDate , status } = req.body;

    if (!title || !description || !dueDate || !status) {
        res.status(404);
        throw new Error("All fields are required");
    }

    const task = await Task.create({
        user_id: req.user.id, 
        title , 
        description , 
        dueDate , 
        status
    });

    res.status(201).json({
        message: "Task added",
        task
    });
});


const DeleteTask = asyncHandler(async(req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error("Task Not Found");
    }

    if (task.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized User");
    }

    await task.deleteOne(); 

    res.status(200).json({ message: "Task Deleted" , task });
});


const UpdateTask =asyncHandler(async(req,res)=>{
    const task = await Task.findById(req.params.id);
     
    if (task && task.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized User");
    }
    
    const updated = await Task.findByIdAndUpdate(
        req.params.id,
        req.body ,
        {new :true}
    )
    res.status(201).json({message: "Task Updated",updated});
})

module.exports = {
    UpdateTask,
    DeleteTask,
    CreateTask,
    getTasks
}