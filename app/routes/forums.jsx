import { Skeleton } from '@mantine/core';
import { Outlet } from '@remix-run/react';

export default function ForumLayout() {
  return (
    <>
      <main className='ml-20 mt-14'>
        <section className="py-12">
          <div className="xl:container">
            <div className="flex gap-6">
              <div className="w-2/3">
                <Outlet />
              </div>
              <div className="w-1/3">
                <Skeleton visible={true}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Rerum, mollitia distinctio! Consectetur commodi quo aliquam
                    similique, pariatur aliquid. Tempore ab amet quis cum et
                    animi optio iure ratione quaerat odio. Lorem, ipsum dolor
                    sit amet consectetur adipisicing elit. Aperiam sed esse
                    animi hic nemo laudantium ipsam dolores! Veniam culpa quas
                    minus aperiam odit sed eligendi quaerat deserunt, iste, non
                    velit!
                  </p>
                </Skeleton>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
