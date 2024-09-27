import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string; // Message to display for confirmation
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-center">Confirm Deletion</h2>
        <p className="my-4 text-center">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-main text-white rounded-md transition duration-200 hover:bg-main-dark"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-md transition duration-200 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
