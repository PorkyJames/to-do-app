import React, { useState } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm"
import AllTasksList from "../AllTasksList/AllTasksList";


const TaskManager = () => {

    //! List of tasks that we'll map through
    const [tasks, setTasks] = useState([]);

    //! Add a task to our list of tasks
    const addTask = (task) => {
        setTasks([...tasks, task])
    };

    return (
        <>
            <h1> TaskManager Component!</h1>

            <h2>AddTaskForm</h2>
            <AddTaskForm addTask = {addTask} />
            <h2>AllTasksList</h2>
            <AllTasksList tasks={tasks} />
        </>
    )
}

export default TaskManager;
