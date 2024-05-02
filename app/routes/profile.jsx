import { Avatar, Badge, Button } from '@mantine/core';
import DetailLabel from '../components/client/DetailLabel';

export default function ProfilePage() {
  return (
    <main>
      <section className="py-12">
        <div className="xl:container">
          <div className="flex">
            <div className="w-1/3">
              <div className="shadow-md rounded-md bg-white p-8 border border-gray-200">
                <div className="flex items-center flex-col mb-5">
                  <Avatar variant="light" size="xl" color="gray" />
                  <h1 className="text-stone-700 font-semibold text-xl mt-3 mb-2">
                    Suraj Kumar{' '}
                  </h1>
                  <Badge color="green" radius="sm" size="xs">
                    New
                  </Badge>
                </div>
                <div className="flex justify-between mb-5">
                  <DetailLabel value={3} title="Posts" />
                  <DetailLabel value={7} title="Profile View" />
                  <DetailLabel value={0} title="Likes" />
                  <DetailLabel value={0} title="Followers" />
                </div>
                <div className="text-center text-sm mb-5">
                  <p>
                    Last Online <span className="font-bold">4mth</span>
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button variant="default" size="xs">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
