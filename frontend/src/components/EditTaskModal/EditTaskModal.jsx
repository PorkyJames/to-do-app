import React, { useState, useEffect } from "react";
import "./EditTaskModal.css"

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
    const [existingTask, setExistingTask] = useState(task);

    //! When the page loads, we should set up the Existing Task.
    useEffect(() => {
        if (isOpen) setExistingTask(task);  
    }, [task, isOpen]);

    //! Then we should 
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setExistingTask(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(existingTask);
    };

    if (!isOpen) return null;

    return (
        <div className="edit-modal-backdrop" onClick={onClose}>
            <div className="edit-modal" onClick={e => e.stopPropagation()}>
                <div className="edit-modal-content">
                    <span className="edit-close-button" onClick={onClose}>&times;</span>
                    <h2> Did you get it done?</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={existingTask.title}
                            onChange={handleChange}
                            placeholder="Enter a Task Title"
                        />
                        <input
                            type="text"
                            name="description"
                            value={existingTask.description}
                            onChange={handleChange}
                            placeholder="Enter a Description"
                        />
                        <label>
                            Completed:
                            <input
                                type="checkbox"
                                name="completed"
                                checked={existingTask.completed}
                                onChange={handleChange}
                            />
                        </label>
                        <button type="submit">Save Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
