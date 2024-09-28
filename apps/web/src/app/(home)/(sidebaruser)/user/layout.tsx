import Sidebar from './_components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div className='lg:pl-[270px] lg:pt-64'>{children}</div>
    </div>
  );
}
