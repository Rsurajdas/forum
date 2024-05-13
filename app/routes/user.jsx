import { Outlet } from "@remix-run/react";

export default function UserPage() {
  return (
    <main className="mt-14">
      <section className="py-12">
        <Outlet />
      </section>
    </main>
  )
}
