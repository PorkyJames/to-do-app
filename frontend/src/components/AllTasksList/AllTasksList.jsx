import React, { useState } from "react";

//! This component will list all the tasks that our user creates or has already been created in our database

const AllTasksList = ( {tasks, onEdit } ) => {

    //! If the tasks length is greater than 0, then we'll create an unorderedlist and map through listing each task and
    //! its index then throw them into a list where each key is the index and the task itself is displayed.
    //! Else, we list a p tag stating that no tasks have been listed yet. 
    return (
        <>
            <h3>List of Tasks to do</h3>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.description || 'No description'} - ({task.completed ? 'Completed' : 'Pending'})
                        <button onClick={() => onEdit(task)}>Edit</button> 
                    </li>
                ))}
                </ul>
            ) : (
                <p> No tasks listed yet!</p>
            )}
        </>
    )
}

export default AllTasksList;
