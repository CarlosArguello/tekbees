import React from 'react';
import ReactModal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : "none"
  }
};
 
 
const Modal = ({ children, isOpen, onClose }) => {

    return (
      
      <ReactModal
        isOpen={ isOpen }
        onRequestClose={ onClose }
        style={customStyles}
      >
        <div 
          className="max-w-full rounded-md shadow-md p-6"
          style={{ width: 600 }}
        >
          { children }
        </div>
      </ReactModal>
    );
}

export default Modal