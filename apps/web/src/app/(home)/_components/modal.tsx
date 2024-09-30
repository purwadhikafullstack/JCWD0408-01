import React from 'react';
import CloseIcon from '../(sidebaruser)/user/_components/CloseIcon';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ closeModal, children }: ModalProps) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="custom-modal-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-main-black bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <div className="relative w-[90%] sm:w-[60%] lg:w-[40%] min-h-[40vh] sm:min-h-[50vh] lg:min-h-[40vh] rounded-2xl bg-secondary text-main text-left shadow-xl transition-all overflow-hidden">
          <div className="px-4 sm:px-5 py-4 sm:py-5">
            <button
              type="button"
              className="rounded-md p-1 inline-flex items-center justify-center text-main-black hover:bg-main hover:text-secondary focus:outline-none absolute top-2 right-2"
              onClick={closeModal}
            >
              <span className="sr-only">Close menu</span>
              <CloseIcon />
            </button>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
