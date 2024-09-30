import { Buyer } from '@/types/user';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal';
import { updateAvatar } from '@/libs/action/buyer';
import CameraIcon from './CameraIcon';
import { FaPen } from 'react-icons/fa'; // Importing the pencil icon
import ConfirmationModal from '@/app/(home)/_components/confirmationmodal';
import { navigate } from '@/libs/action/server';
import ChangeMail from './profileedit/changemail';

interface refCodeProfile extends Buyer {
  referral_code: string | null;
}

export default function Profile({
  first_name,
  last_name,
  email,
  phone,
  date_ob,
  avatar,
  referral_code,
}: refCodeProfile) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false); // New state for email editing
  const avatarUrl = avatar ? `${avatar}` : '/defaultavatar.webp';

  const handlePasswordChangeConfirm = () => {
    navigate('/forgotpassword');
  };

  const handleCancelEmailChange = () => {
    setIsEditingEmail(false); // Close the email editing form
  };

  const handleEmailChangeSuccess = () => {
    setIsEditingEmail(false); // Close the email editing state
  };

  return (
    <div className="w-full bg-secondary p-8 shadow-lg rounded-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-evenly space-x-0 md:space-x-8"
      >
        <div className="flex flex-col ">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="relative">
              <Image
                src={avatarUrl}
                width={300}
                height={300}
                alt="avatar"
                className="w-48 h-48 lg:w-[300px] lg:h-[300px] rounded-full border-4 border-accent"
              />
              <button
                className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-2 rounded-full bg-main hover:bg-main-dark transition duration-200 shadow-md"
                title="Change photo"
                onClick={() => setModalOpen(true)}
              >
                <CameraIcon />
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsConfirmationOpen(true)} // Open confirmation modal
            className="mt-10 w-48 mx-auto bg-main text-secondary px-4 py-2 rounded-lg hover:bg-main-dark transition duration-200"
          >
            Change Password
          </button>
        </div>

        <div className="flex flex-col space-y-6 w-full pt-10 lg:pt-0 lg:w-1/2">
          <div className="space-y-4">
            <div className="flex flex-col border-b border-gray-300 pb-2">
              <span className="font-medium text-lg">Name</span>
              <span className="text-gray-700 text-xl">
                {first_name} {last_name}
              </span>
            </div>
            
            <div className="flex flex-col border-b border-gray-300 pb-2">
              <span className="font-medium text-lg">Date of Birth</span>
              <span className="text-gray-700 text-xl flex items-center justify-between">
                {date_ob ? date_ob : 'Not available'}
                <FaPen
                  className="text-gray-500 cursor-pointer hover:text-main transition duration-200"
                  title="Edit Date of Birth"
                />
              </span>
            </div>

            <div className="flex flex-col border-b border-gray-300 pb-2">
              <span className="font-medium text-lg">Email</span>
              
              {/* Conditionally render the email or the ChangeEmail component */}
              {isEditingEmail ? (
                <div className="w-full"> {/* Make input field take full width */}
                  <ChangeMail onCancel={handleCancelEmailChange} onSuccess={handleEmailChangeSuccess} /> {/* Pass onCancel handler */}
                </div>
              ) : (
                <span className="text-gray-700 text-xl flex items-center justify-between">
                  {email}
                  <FaPen
                    className="text-gray-500 cursor-pointer hover:text-main transition duration-200"
                    title="Edit Email"
                    onClick={() => setIsEditingEmail(true)} // Enable editing
                  />
                </span>
              )}
            </div>

            <div className="flex flex-col border-b border-gray-300 pb-2">
              <span className="font-medium text-lg">Phone Number</span>
              <span className="text-gray-700 text-xl">{phone}</span>
            </div>

            <div className="flex flex-col border-b border-gray-300 pb-2">
              <span className="font-medium text-lg">Your Referral Code</span>
              <span className="text-gray-700 text-xl">{referral_code}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Avatar Modal */}
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handlePasswordChangeConfirm} // Trigger navigation on confirm
        header="Confirm change"
        message="You will be redirected to password change process, proceed?"
      />
    </div>
  );
}
