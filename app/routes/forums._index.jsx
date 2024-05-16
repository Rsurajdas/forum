import { Link, useLoaderData } from '@remix-run/react';
import { Accordion } from '@mantine/core';
import { IconFolder } from '@tabler/icons-react';
import { useState } from 'react';
import ForumList from '../components/client/ForumList';
import { getAllFolders } from '../utils/folder.server';
import Empty from '../components/client/Empty';

export const loader = async () => {
  return await getAllFolders()
}

export default function ForumPage() {
  const { folders } = useLoaderData()
  const activeFolders = folders.filter(folder => folder.forums.length).map(folder => folder.title)
  const [folder, setFolder] = useState(activeFolders);

  return (
    <>
      {console.log(folders)}
      <Accordion
        variant="separated"
        disableChevronRotation
        value={folder}
        onChange={setFolder}
      >
        {folders.map((folder) => (
          <Accordion.Item key={folder.id} value={folder.title}>
            <Accordion.Control icon={<IconFolder />}>
              <Link to={`/forums/folder/${folder.slug}`}>
                {folder.title}
              </Link>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="flex flex-col gap-4 py-4 px-2">
                {folder?.forums?.length ? folder?.forums.map((forum) => (
                  <ForumList
                    key={forum.id}
                    {...forum}
                    topicCount={forum.topicCount}
                    postCount={forum.postCount}
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
