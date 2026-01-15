import Navbar from '@/components/Navbar';
import { ToastContainer } from '@/components/Toast';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-20 pb-24 px-4">
      <div className="container mx-auto max-w-md">{children}</div>
      <Navbar />
      <ToastContainer />
    </div>
  );
}
