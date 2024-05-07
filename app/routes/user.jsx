import { Outlet } from "@remix-run/react";

export default function UserPage() {
  return (
    <main className="ml-20 mt-14">
      <section className="py-12">
        <Outlet />
      </section>
    </main>
  )
}
