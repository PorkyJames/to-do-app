import React, { useState, useEffect } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm"
import AllTasksList from "../AllTasksList/AllTasksList";
import EditTaskModal from "../EditTaskModal/EditTaskModal"
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

import "./TaskManager.css"



const TaskManager = () => {

    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    //! Modal Logic
    const openEditModal = (task) => {
        setCurrentTask(task);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const openDeleteModal = (task) => {
        setCurrentTask(task);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    //! Fetch all Tasks from backend
    //! Create the url then fetch it. If there are errors, deal with that edge case.
    //! Then we set the tasks to whatever the data that's been provided.
    //! Remember, this useEffect will fetch the server data with all of my previous tasks
    const fetchTasks = async () => {
        const url = `${process.env.REACT_APP_API_URL}/todos/`
        try {
            const res = await fetch(url);

            if (!res.ok) throw new Error('Failed to fetch tasks');
            
            const tasksData = await res.json();

            setTasks(tasksData);  

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []); 

    //! Add a task to our list of tasks from the backend via the frontend
    //! We take taskTitle and description that's been input by the user
    //! Then we add it to our request in a JSON body. Then we add that to our existing tasks
    const addTask = async (taskTitle, description) => {
        const url = `${process.env.REACT_APP_API_URL}/todos/`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: taskTitle, 
                    description: description,   
                    completed: false,  
                })
            });
    
            if (!res.ok) throw new Error('Failed to add the task');
    
            const newestTask = await res.json();
            setTasks(existingTasks => [...existingTasks, newestTask]);
    
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    //! Edit / Save the new task that's been edited
    //! Fetch from url the existing task based on the task.id
    //! Then we re-save that in a json format. Then we reset that task that's been updated.
    //! We go through each task and check if the taskId matches the id of the task that's been updated
    //! If true, then the task was updated. If false, then it wasn't the one we updated.
    //! Then we close the edit modal right after everything is updated.
    const saveTask = async (updatedTask) => {
        const url = `${process.env.REACT_APP_API_URL}/todos/${updatedTask.id}/`
        try {
            const res = await fetch(url, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });
    
            if (!res.ok) throw new Error('Failed to update the task');
            
            const savedTask = await res.json(); 

            setTasks(prevTasks => prevTasks.map(task => task.id === savedTask.id ? savedTask : task));

            closeEditModal();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    //! Delete a task that exists in the list
    //! Fetch the url via taskId and then delete that punk.
    //! Then re-update the state of our tasks by filtering for any tasks with the same id.
    //! Then we close that modal once we're done deleting. 
    const deleteTask = async (taskId) => {
        const url = `${process.env.REACT_APP_API_URL}/todos/${taskId}/`;
        try {
            const res = await fetch(url, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete the task');
            
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

            closeDeleteModal();

        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    return (
        <>  
            <div className="task-manager-title">
                <h1>My Day</h1>
            </div>     

            <AllTasksList tasks={tasks} onEdit={openEditModal} onDelete={openDeleteModal} />

            <AddTaskForm addTask={addTask}/>

            {currentTask && (
                <EditTaskModal
                    task={currentTask}
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    onSave={saveTask}
                />
            )}

            {currentTask && (
                <DeleteTaskModal
                    task={currentTask}
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={deleteTask}
                />
            )}

        </>
    )
}

export default TaskManager;
