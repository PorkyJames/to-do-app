import React from "react";
import './AllTasksList.css'

//! This component will list all the tasks that our user creates or has already been created in our database

const AllTasksList = ( {tasks, onEdit, onDelete } ) => {

    //! If the tasks length is greater than 0, then we'll create an unorderedlist and map through listing each task and
    //! its index then throw them into a list where each key is the index and the task itself is displayed.
    //! Else, we list a p tag stating that no tasks have been listed yet. 
    return (
        <>
            <div className="task-list-container">  
                {tasks.length > 0 ? (
                    <div className="tasks-container">
                        {tasks.map(task => (
                            <div className="task-card" key={task.id}>
                                <div className="task-info">
                                    <span className="task-title">{task.title}</span>
                                    <span className="task-description">{task.description || 'No description'}</span>
                                    <span className="task-status">{task.completed ? '✔️' : 'Get to it!'}</span>
                                </div>
                                <div className="task-actions">
                                    <button className="edit-button" onClick={() => onEdit(task)}>Edit</button>
                                    <button className="delete-button" onClick={() => onDelete(task)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p> No tasks listed yet!</p>
                )}
            </div>
        </>
    )
}

export default AllTasksList;
