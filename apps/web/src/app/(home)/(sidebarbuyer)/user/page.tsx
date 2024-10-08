import BuyerProfile from './_components/buyerprofile';
import ProfileHeader from './_components/headers/profileheader';

export default function UserPage() {
  return (
    <div className="w-full">
      <ProfileHeader />
      <BuyerProfile />
    </div>
  );
}
