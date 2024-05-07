import { useState } from 'react';
import { Table, Checkbox, Button, Title, TextInput, Textarea } from '@mantine/core';
import { Form } from '@remix-run/react';

const elements = [
  {
    id: '1',
    title: 'User',
    description: "Role Description"
  },
  {
    id: '2',
    title: 'Moderator',
    description: "Role Description"
  },
  {
    id: '3',
    title: 'Admin',
    description: "Role Description"
  },
];

export default function RolesPage() {
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <>
      <div className="mb-8 font-normal">
        <Title order={1} style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` }}>Roles</Title>
      </div>
      <div className="">
        <div className='mb-12 w-1/3'>
          <Form className='flex gap-4 flex-col w-full' method='post'>
            <TextInput label="Title" name='title' />
            <Textarea
              label="Desctiption"
              name='decription'
            />
            <button type="submit" className='bg-indigo-700 py-1.5 px-8 rounded-sm text-white hover:scale-101 transition-all ease-in-out active:scale-100 hover:shadow-md active:shadow-sm hover:shadow-stone-400 active:shadow-stone-300'>Submit</button>
          </Form>
        </div>
        <Table highlightOnHover withTableBorder withColumnBorders className='w-1/3'>
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              <Table.Th>Title</Table.Th>
              <Table.Th>Desctiopn</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {elements.map((element) => (
              <Table.Tr
                key={element.id}
                bg={
                  selectedRows.includes(element.id)
                    ? 'var(--mantine-color-indigo-light)'
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
                <Table.Td>{element.title}</Table.Td>
                <Table.Td>{element.description}</Table.Td>
                <Table.Td>
                  <div className="flex gap-2">
                    <Button variant="default" color="indigo">
                      View
                    </Button>
                    <Button variant="default" color="indigo">
                      Edit
                    </Button>
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}