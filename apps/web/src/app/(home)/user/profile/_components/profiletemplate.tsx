import { Buyer } from '@/types/user';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Modal from './Modal';
import { updateAvatar } from '@/libs/action/buyer';
import CameraIcon from './CameraIcon';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

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
    <div className="flex flex-col pt-10 bg-secondary ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center p-4"
      >
        <div className="relative">
          <Image
            src={avatarUrl}
            width={150}
            height={150}
            alt="avatar"
            className="w-[150px] h-[150px] rounded-full border-8 border-main"
          />
          <button
            className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-main hover:bg-main-black"
            title="Change photo"
            onClick={() => setModalOpen(true)}
          >
            <CameraIcon />
          </button>
        </div>
        {modalOpen && (
          <Modal
            updateAvatar={updateAvatar}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 space-y-4 mt-16"
      >
        <div>
          <span className="block text-main-black text-sm">Full Name</span>
          <span className="block text-lg font-semibold">
            {first_name} {last_name}
          </span>
        </div>
        <div>
          <span className="block text-main-black text-sm">Email</span>
          <span className="block text-lg font-semibold">{email}</span>
        </div>
        <div>
          <span className="block text-main-black text-sm">Phone</span>
          <span className="block text-lg font-semibold">{phone}</span>
        </div>
        <div>
          <span className="block text-main-black text-sm">Date of Birth</span>
          <span className="block text-lg font-semibold">{date_ob}</span>
        </div>
      </motion.div>
    </div>
  );
}
