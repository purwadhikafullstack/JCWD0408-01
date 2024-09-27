'use client';

import Contents from './_components/contents';
import BuyerProfile from './_components/buyerprofile';

export default function UserPage() {
  return (
    <div className="flex flex-col md:flex-row w-full items-center">
      <div className="w-[370px] lg:w-1/3">
        <BuyerProfile />
      </div>
      <div className="bg-secondary w-full rounded-xl lg:mx-10">
        <Contents />
      </div>
    </div>
  );
}
