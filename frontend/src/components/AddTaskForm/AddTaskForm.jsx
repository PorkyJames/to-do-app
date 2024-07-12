import React, { useState } from "react"
import "./AddTaskForm.css"

const AddTaskForm = ( { addTask }) => {

    const [userInput, setUserInput] = useState('');
    const [userInputDesc, setUserInputDesc] = useState('');

    //! Handle Submit button will trim the user's input and then add that user input to the task and then reset the userInput to empty
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim() && userInputDesc.trim()) {
            addTask(userInput.trim(), userInputDesc.trim());
            setUserInput("")
            setUserInputDesc("")
        }
    }

    //! One giant form that utilizes our handleSubmit function above. Basically edit the title / desc based on two different
    //! useState changes. 
    return (
        <>
            <div className="add-task-card">
                
                <form onSubmit={handleSubmit} className="add-task-form">

                    <div className="input-container">
                        <input
                            type='text'
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Enter a Task"
                            className="task-input"
                        />

                        <textarea
                            value={userInputDesc}
                            onChange={(e) => setUserInputDesc(e.target.value)}
                            placeholder="Enter the description"
                            className="description-input"
                        />

                    </div>

                    <button type='submit' className="add-task-button">➕</button>
                </form>
            </div>
        </>
    )
}

export default AddTaskForm;
