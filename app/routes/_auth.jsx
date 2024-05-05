import { Outlet } from '@remix-run/react';

export default function AuthPage() {
  return (
    <main>
      <section className="py-12">
        <div className="xl:container">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
