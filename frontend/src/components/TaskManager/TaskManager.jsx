import React, { useState, useEffect } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm"
import AllTasksList from "../AllTasksList/AllTasksList";


const TaskManager = () => {

    //! List of tasks that we'll map through
    const [tasks, setTasks] = useState([]);

    //! Fetch all Tasks from backend
    const fetchTasks = async () => {
        const url = 'http://localhost:8000/api/todos/';
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Failed to fetch tasks');
            }

            const tasksData = await res.json();

            setTasks(tasksData);  

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // useEffect to call fetchTasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []); 

    //! Add a task to our list of tasks from the backend via the frontend
    const addTask = async (taskTitle) => {
        const url = 'http://localhost:8000/api/todos/';
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: taskTitle, 
                    description: "",   
                    completed: false,  
                })
            });
    
            if (!res.ok) {
                throw new Error('Failed to add the task');
            }
    
            const newestTask = await res.json();
            setTasks(listedTasks => [...listedTasks, newestTask]);
    
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    

    return (
        <>
            <h1> TaskManager Component!</h1>
            
            <AddTaskForm addTask={addTask}/>

            <AllTasksList tasks={tasks} />
        </>
    )
}

export default TaskManager;
