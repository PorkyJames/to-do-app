import React from "react";
import "./DeleteTaskModal.css"

const DeleteTaskModal = ({isOpen, onClose, onDelete, task}) => {
    
    //! If the modal isn't opened, return null. 
    //! If it's not open at the moment, then it shouldn't open randomly. 
    //! Stay shut until I ask for it to open
    if(!isOpen) return null

    return (
        <>
            <div className="delete-modal-backdrop" onClick={onClose}>
                <div className="deleteModal">
                    <div className="delete-modal-content">
                        <h3>Are you sure you want to delete this Task?</h3>
                        <p>{task.title}</p>
                        <button onClick={() => onDelete(task.id)}>Delete</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default DeleteTaskModal;
