import { useState } from 'react';
import { Table, Checkbox, Avatar, Button, Title } from '@mantine/core';
import styles from '../styles/global.css?url';

const elements = [
  {
    id: '1',
    author: 'Suraj Kumar Das',
    title: 'Customer Support Notice for Lunar New Year Holiday - Feb, 2019',
    forum: 'Announcements',
    post: '4',
    date: 'a day ago',
  },
  {
    id: '2',
    author: 'John Doe',
    title: '🎁 Super Deals on All Best-Selling Women Shoes| Limited Time!',
    forum: 'Pre-Sales Questions',
    post: '3',
    date: '2 day ago',
  },
  {
    id: '3',
    author: 'John Doe',
    title: 'Out with the old, in with the new?',
    forum: 'Pre-Sales Questions',
    post: '7',
    date: '4 day ago',
  },
];

export default function DashboardTopicsPage() {
  const [selectedRows, setSelectedRows] = useState([]);

  const rows = elements.map((element) => (
    <Table.Tr
      key={element.id}
      bg={
        selectedRows.includes(element.id)
          ? 'var(--mantine-color-lime-light)'
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.id]
                : selectedRows.filter((id) => id !== element.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>
        <div className="flex gap-2 items-center">
          <Avatar color="lime" radius="xl">
            {element.author
              .split(' ')
              .reduce((subStr, str) => subStr + str[0], '')
              .slice(0, 'ww'.length)}
          </Avatar>
          {element.author}
        </div>
      </Table.Td>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.forum}</Table.Td>
      <Table.Td>{element.post}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>
        <div className="flex gap-2">
          <Button variant="default" color="lime">
            View
          </Button>
          <Button variant="default" color="lime">
            Edit
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className="mb-8 font-normal">
        <Title order={1}>Topics</Title>
      </div>
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Author</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Forum</Table.Th>
            <Table.Th>Post</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}

export const links = () => [{ rel: 'stylesheet', href: styles }];
