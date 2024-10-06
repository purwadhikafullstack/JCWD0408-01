import Sidebar from './_components/sidebar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div className='lg:pl-[270px] py-16 lg:py-0'>{children}</div>
    </div>
  );
}
