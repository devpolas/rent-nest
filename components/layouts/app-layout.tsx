import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />

      <main className='flex-1 mx-auto px-4 container'>{children}</main>

      <Footer />
    </div>
  );
}
