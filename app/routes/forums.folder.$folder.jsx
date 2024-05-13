import { Accordion } from '@mantine/core';
import { IconFolder } from '@tabler/icons-react';
import { useState } from 'react';
import ForumList from '../components/client/ForumList';
import { json, useLoaderData } from '@remix-run/react';
import { getFolderBySlug } from '../utils/folder.server';
import Empty from '../components/client/Empty';

// eslint-disable-next-line no-unused-vars
export const loader = async ({ request, params }) => {
  const { folder } = params
  return json({ folder: await getFolderBySlug(folder) })
}

export default function ForumFolderPage() {
  const { folder } = useLoaderData()
  const [selected, setSelected] = useState(folder.title);

  return (
    <>
      <Accordion
        variant="separated"
        disableChevronRotation
        value={selected}
        onChange={setSelected}
      >
        <Accordion.Item key={folder.id} value={folder.title}>
          <Accordion.Control icon={<IconFolder />}>
            {folder.title}
          </Accordion.Control>
          <Accordion.Panel>
            <div className="flex flex-col gap-4 py-4 px-2">
              {folder.forums.length ? folder.forums.map((forum) => (
                <ForumList
                  key={forum.id}
                  {...forum}
                />
              )) : <Empty />}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
