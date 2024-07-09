import React, { useState } from "react";

//! This component will list all the tasks that our user creates or has already been created in our database

const AllTasksList = ( {tasks} ) => {

    return (
        <>
            <h3>List of Tasks to do</h3>
            //! If the tasks length is greater than 0, then we'll create an unorderedlist and map through listing each task and
            //! its index then throw them into a list where each key is the index and the task itself is displayed.
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task,index) => {
                        <li key={index}>{task}</li>
                    })}
                </ul>
            ) : (
                //! Else, we list a p tag stating that no tasks have been listed yet. 
                <p> No tasks listed yet!</p>
            )}
        </>
    )
}

export default AllTasksList;
