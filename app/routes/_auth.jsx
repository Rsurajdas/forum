import { Outlet } from '@remix-run/react';

export default function AuthPage() {
  return (
    <main className='ml-20 mt-14'>
      <section className="py-12">
        <div className="xl:container">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
