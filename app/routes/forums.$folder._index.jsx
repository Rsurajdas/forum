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
];

export default function ForumFolderPage() {
  const [folder, setFolder] = useState(['Community']);
  return (
    <Accordion
      variant="separated"
      disableChevronRotation
      value={folder}
      onChange={setFolder}
    >
      {folders.map((item) => (
        <Accordion.Item key={item.folder} value={item.folder}>
          <Accordion.Control icon={<IconFolder />}>
            {item.folder}
          </Accordion.Control>
          <Accordion.Panel>
            <div className="flex flex-col gap-4">
              {item.forums.map((forum) => (
                <ForumList
                  key={forum.id}
                  {...forum}
                  folderName={item.folder.toLowerCase()}
                />
              ))}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
