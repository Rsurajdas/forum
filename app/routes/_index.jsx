import { Accordion } from '@mantine/core';
import { IconFolder } from '@tabler/icons-react';
import { useState } from 'react';
import ForumList from '../components/client/ForumList';

export const meta = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

const groceries = [
  {
    folder: 'Community',
    forums: [
      {
        id: '1',
        title: 'Pre-Sales Questions',
        description: 'Any pre-sales questions are welcome here!',
        topics: 3,
        posts: 5,
      },
      {
        id: '2',
        title: 'General Discussion',
        description:
          'Talk about all things regarding Our products and e-commerce',
        topics: 0,
        posts: 0,
      },
      {
        id: '3',
        title: 'Announcements',
        description: 'News, Announcements, Promotions',
        topics: 2,
        posts: 3,
      },
    ],
  },
  {
    folder: 'Purchase Support',
    forums: [
      {
        id: '1',
        title: 'Request and Wishlist',
        description: 'What products would you like to buy.',
        topics: 0,
        posts: 0,
      },
      {
        id: '2',
        title: 'Shipping, payment and warranty',
        description: 'All about shipping, payment and warranty',
        topics: 0,
        posts: 0,
      },
      {
        id: '3',
        title: 'Customer Center',
        description:
          'Only for customers who have purchased the product at the store',
        topics: 0,
        posts: 0,
      },
    ],
  },
  {
    folder: 'New launch',
    forums: [
      {
        id: '1',
        title: 'Test Forum',
        description: 'Test Description',
        topics: 1,
        posts: 1,
      },
    ],
  },
];

export default function Index() {
  const [folder, setFolder] = useState(['Community']);
  return (
    <>
      <main>
        <section className="py-12">
          <div className="xl:container">
            <div className="flex">
              <div className="w-2/3">
                <Accordion
                  variant="separated"
                  disableChevronRotation
                  value={folder}
                  onChange={setFolder}
                >
                  {groceries.map((item) => (
                    <Accordion.Item key={item.folder} value={item.folder}>
                      <Accordion.Control icon={<IconFolder />}>
                        {item.folder}
                      </Accordion.Control>
                      <Accordion.Panel>
                        <div className="flex flex-col gap-4">
                          {item.forums.map((forum) => (
                            <ForumList key={forum.id} {...forum} />
                          ))}
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
