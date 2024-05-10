import { Link } from '@remix-run/react';
import { Accordion } from '@mantine/core';
import { IconFolder } from '@tabler/icons-react';
import { useState } from 'react';
import ForumList from '../components/client/ForumList';
import slugify from 'slugify';

const folders = [
  {
    folder: 'Community',
    forums: [
      {
        id: '1',
        title: 'Pre-Sales Questions',
        description: 'Any pre-sales questions are welcome here!',
        topics: 3,
        posts: 5,
        slug: slugify('Pre-Sales Questions', {
          lower: true,
        }),
      },
      {
        id: '2',
        title: 'General Discussion',
        description:
          'Talk about all things regarding Our products and e-commerce',
        topics: 0,
        posts: 0,
        slug: slugify('General Discussion', {
          lower: true,
        }),
      },
      {
        id: '3',
        title: 'Announcements',
        description: 'News, Announcements, Promotions',
        topics: 2,
        posts: 3,
        slug: slugify('Announcements', {
          lower: true,
        }),
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
        slug: slugify('Purchase Support', {
          lower: true,
        }),
      },
      {
        id: '2',
        title: 'Shipping, payment and warranty',
        description: 'All about shipping, payment and warranty',
        topics: 0,
        posts: 0,
        slug: slugify('Shipping, payment and warranty', {
          lower: true,
        }),
      },
      {
        id: '3',
        title: 'Customer Center',
        description:
          'Only for customers who have purchased the product at the store',
        topics: 0,
        posts: 0,
        slug: slugify('Customer Center', {
          lower: true,
        }),
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
        slug: slugify('Test Forum', {
          lower: true,
        }),
      },
    ],
  },
];

export default function ForumPage() {
  const [folder, setFolder] = useState(['Purchase Support']);

  return (
    <>
      <Accordion
        variant="separated"
        disableChevronRotation
        value={folder}
        onChange={setFolder}
      >
        {folders.map((item) => (
          <Accordion.Item key={item.folder} value={item.folder}>
            <Accordion.Control icon={<IconFolder />}>
              <Link to={`${slugify(item.folder, { lower: true })}`}>
                {item.folder}
              </Link>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="flex flex-col gap-4">
                {item.forums.map((forum) => (
                  <ForumList
                    key={forum.id}
                    {...forum}
                  />
                ))}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
