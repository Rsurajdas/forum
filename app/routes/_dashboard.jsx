import { Outlet } from '@remix-run/react';
import Header from '../components/client/Header';
import Navbar from '../components/dashboard/Navbar';

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="flex">
        <Navbar />
        <div className="content w-full">
          <div className="container p-12">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
