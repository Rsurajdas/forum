import { Outlet } from '@remix-run/react';

export default function ForumLayout() {
  return (
    <>
      <main className='mt-14'>
        <section className="py-12">
          <div className="xl:container">
            <div className="flex gap-6">
              <div className="w-2/3">
                <Outlet />
              </div>
              <div className="w-1/3">

              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
