export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-col mx-auto max-w-384 min-h-screen'>
      <section className='flex-1'>{children}</section>
    </main>
  );
}
