import React, { useState, useEffect } from 'react';
import './styles/Modal.css';

function Modal({ closeModal, handleModalSubmit, isDeleteMode, curIndexValue, handleDeleteData }) {
    const [value, setValue] = useState(curIndexValue.value || "-");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClickOutside = (event) => {
        const modalContent = document.querySelector('.modalContent');
        if (modalContent && !modalContent.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        if (!isDeleteMode) {
            document.querySelector(".inputUpdatedColumn").focus()
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='modalWrapper'>
            <div className="modalContent">
                {isDeleteMode ? (
                    <p>Are you sure you want to delete row <b>{curIndexValue.index + 1}</b>?</p>
                ) : (
                    <div className='inputWrapperModal'>
                        <label>Edit Column Data: </label>
                        <input className='inputUpdatedColumn'
                            type="text"
                            value={value}
                            onChange={handleChange}
                        />
                    </div>

                )}

                <div className="modalButtons">
                    <button onClick={() => { closeModal() }}>Cancel</button>
                    {isDeleteMode ?
                        (<button className='confirmDeleteButton' onClick={() => { handleDeleteData() }}>Confirm</button>) :
                        (<button className='submitEditButton' onClick={() => { handleModalSubmit(value) }}>Submit</button>)}
                </div>
            </div>
        </div>
    );
}

export default Modal;
