import { Outlet } from "@remix-run/react";

export default function UserPage() {
  return (
    <main>
      <section className="py-12">
        <Outlet />
      </section>
    </main>
  )
}
