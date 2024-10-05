import { Footer } from '@/components/Footer';
import Navbar from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar/>
      
      {children}
      <Footer/>
    </div>
  );
}
