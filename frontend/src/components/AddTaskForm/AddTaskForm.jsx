import React, { useState } from "react"

const AddTaskForm = ( { addTask }) => {

    const [userInput, setUserInput] = useState('');

    //! Handle Submit button will trim the user's input and then add that user input to the task and then reset the userInput to empty
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim()) {
            addTask(userInput);
            setUserInput("")
        }
    }
    
    return (
        <>
        
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter a Task"
                />

                <button type='submit'>Add New Task</button>

            </form>
        </>
    )
}

export default AddTaskForm;
