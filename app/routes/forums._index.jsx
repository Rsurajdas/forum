import { Link, json, useLoaderData } from '@remix-run/react';
import { Accordion } from '@mantine/core';
import { IconFolder } from '@tabler/icons-react';
import { useState } from 'react';
import ForumList from '../components/client/ForumList';
import { getAllFolders } from '../utils/folder.server';
import Empty from '../components/client/Empty';

export const loader = async () => {
  return json({ folder: await getAllFolders() })
}

export default function ForumPage() {
  const data = useLoaderData()
  const sortedFolders = data?.folder.sort((a, b) => a.position - b.position)
  const activeFolders = sortedFolders.filter(item => item.forums.length).map(item => item.title)
  const [folder, setFolder] = useState(activeFolders);

  return (
    <>
      <Accordion
        variant="separated"
        disableChevronRotation
        value={folder}
        onChange={setFolder}
      >
        {sortedFolders.map((item) => (
          <Accordion.Item key={item.id} value={item.title}>
            <Accordion.Control icon={<IconFolder />}>
              <Link to={`/forums/folder/${item.slug}`}>
                {item.title}
              </Link>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="flex flex-col gap-4 py-4 px-2">
                {item.forums.length ? item.forums.map((forum) => (
                  <ForumList
                    key={forum.id}
                    {...forum}
                  />
                )) : <Empty />}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
