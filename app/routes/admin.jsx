import { Outlet } from "@remix-run/react";
import Navbar from "../components/dashboard/Navbar";

export default function DashboardPage() {
  return (
    <>
      <main className="flex ml-20 mt-14">
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
