import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action', 
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  
  const footer = (
    <>
      <Button variant="ghost" onClick={onClose}>
        {cancelText}
      </Button>
      <Button variant={confirmVariant} onClick={handleConfirm}>
        {confirmText}
      </Button>
    </>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
    >
      <p className="text-gray-700 dark:text-gray-300 transition-colors">{message}</p>
    </Modal>
  );
};

export default ConfirmDialog;