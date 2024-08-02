import React from 'react';
import Modal from "react-modal";

const ModalWrapper = (
    {
        isOpen,
        onRequestClose,
        contentLabel,
        children
    }
) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
            {children}
        </Modal>
    );
};

export default ModalWrapper;