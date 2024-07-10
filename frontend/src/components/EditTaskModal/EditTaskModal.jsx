import React, { useState, useEffect } from "react";

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
    const [editedTask, setEditedTask] = useState(task);

    useEffect(() => {
        if (isOpen) {
            setEditedTask(task);  
        }
    }, [task, isOpen]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setEditedTask(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedTask);
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={editedTask.title}
                        onChange={handleChange}
                        placeholder="Enter a Task Title"
                    />
                    <input
                        type="text"
                        name="description"
                        value={editedTask.description}
                        onChange={handleChange}
                        placeholder="Enter a Description"
                    />
                    <label>
                        Completed:
                        <input
                            type="checkbox"
                            name="completed"
                            checked={editedTask.completed}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save Task</button>
                </form>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
};

export default EditTaskModal;
