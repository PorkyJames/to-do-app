import React, { useState, useEffect } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm"
import AllTasksList from "../AllTasksList/AllTasksList";
import EditTaskModal from "../EditTaskModal/EditTaskModal"
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";


const TaskManager = () => {

    //! List of tasks that we'll map through
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);  // Task to edit
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    //! Modal Logic
    const openEditModal = (task) => {
        setCurrentTask(task);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

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

    //! Edit / Save the new task that's been edited
    const saveTask = async (updatedTask) => {
        const url = `http://localhost:8000/api/todos/${updatedTask.id}/`
        try {
            const response = await fetch(url, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });
    
            if (!response.ok) {
                throw new Error('Failed to update the task');
            }
    
            const savedTask = await response.json(); 
            setTasks(prevTasks => prevTasks.map(task => task.id === savedTask.id ? savedTask : task));
            closeEditModal();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };


    return (
        <>
            <h1> TaskManager Component!</h1>
            
            <AddTaskForm addTask={addTask}/>

            <AllTasksList tasks={tasks} onEdit={openEditModal} />

            {currentTask && (
                <EditTaskModal
                    task={currentTask}
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    onSave={saveTask}
                />
            )}

        </>
    )
}

export default TaskManager;
