import { Buyer } from '@/types/user';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal';
import { updateAvatar } from '@/libs/action/buyer';
import CameraIcon from './CameraIcon';

export default function Profile({
  first_name,
  last_name,
  email,
  phone,
  date_ob,
  avatar,
}: Buyer) {
  const [modalOpen, setModalOpen] = useState(false);
  const avatarUrl = avatar ? `${avatar}` : '/defaultavatar.webp';

  return (
    <div className="flex justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full max-w-sm bg-secondary p-4 shadow-lg shadow-gray-500/50 rounded-lg space-y-4" // customized shadow
      >
        {/* Avatar Section */}
        <div className="relative">
          <Image
            src={avatarUrl}
            width={120}
            height={120}
            alt="avatar"
            className="w-[120px] h-[120px] rounded-full border-2 border-gray-200"
          />
          <button
            className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-1 rounded-full bg-main hover:bg-main-dark transition duration-200 shadow-md"
            title="Change photo"
            onClick={() => setModalOpen(true)}
          >
            <CameraIcon />
          </button>
        </div>

        {/* Change Password Button */}
        <button className="w-full py-2 text-sm font-semibold text-white bg-main hover:bg-main-dark rounded-md transition">
          Change Password
        </button>

        {/* Profile Details */}
        <div className="w-full space-y-3">
          <div className="flex flex-col">
            <span className="font-medium">Name</span>
            <span className="text-gray-700">
              {first_name} {last_name}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Date of Birth</span>
            <span className="text-gray-700">{date_ob}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Email</span>
            <span className="text-gray-700">{email}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Phone Number</span>
            <span className="text-gray-700">{phone}</span>
          </div>
        </div>
      </motion.div>

      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
