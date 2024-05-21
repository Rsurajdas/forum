import { useEffect, useState } from 'react';
import { Table, Title, TextInput, Textarea, Tooltip } from '@mantine/core';
import { Form, json, useActionData, useFetcher, useLoaderData, useMatches, useSubmit } from '@remix-run/react';
import { createUpdateRole, getAllRoles } from '../utils/roles.server';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export const loader = async () => {
  return json({ roles: await getAllRoles() })
}

export default function RolesPage() {
  const { roles } = useLoaderData()
  const submit = useSubmit()
  const fetcher = useFetcher()
  const matches = useMatches()
  const data = useActionData()
  const [role] = matches.filter(item => item.id === "routes/admin.roles.$id")
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })
  const handleFormData = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    submit(formData, {
      method: "POST",
    })
    setFormData({
      title: '',
      description: ""
    })
  }
  const handleDelete = (id) => {
    fetcher.submit(null, {
      method: "DELETE",
      action: `/admin/roles/${id}`
    })
  }
  const handleFetchRole = (id) => {
    submit(null, {
      method: "GET",
      action: `/admin/roles/${id}`
    })
  }
  useEffect(
    () => {
      if (role) {
        setFormData({
          title: role?.data?.title,
          description: role?.data?.description
        })
      }
    }, [role]
  )

  return (
    <>
      <div className="mb-8">
        <Title order={1} style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` }}>Roles</Title>
      </div>
      <div className="flex flex-col">
        <div className='mb-12 w-1/3'>
          <Form className='flex gap-4 flex-col w-full' method='post' onSubmit={handleFormSubmit}>
            <TextInput label="Title" name='title' value={formData.title} onChange={(e) => handleFormData(e)} withAsterisk error={data?.input} />
            <Textarea
              label="Desctiption"
              name='description'
              value={formData.description}
              onChange={(e) => handleFormData(e)}
            />
            <button type="submit" className='bg-indigo-700 py-1.5 px-8 rounded-sm text-white hover:scale-101 transition-all ease-in-out active:scale-100 hover:shadow-md active:shadow-sm hover:shadow-stone-400 active:shadow-stone-300'>Submit</button>
          </Form>
        </div>
        <Table highlightOnHover withTableBorder withColumnBorders >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Users</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {roles.map((element) => (
              <Table.Tr
                key={element.id}
              >
                <Table.Td>{element.title}</Table.Td>
                <Table.Td>{element.description}</Table.Td>
                <Table.Td>{element.profileId.length}</Table.Td>
                <Table.Td>
                  <div className="flex gap-3">
                    <Tooltip label="Edit" position='bottom' color='indigo'>
                      <button onClick={() => handleFetchRole(element.id)}>
                        <IconEdit color='#222' stroke={1.5} style={{ width: '90%', height: '90%' }} />
                      </button>
                    </Tooltip>
                    <Tooltip label="Delete" position='bottom' color='red'>
                      <button onClick={() => handleDelete(element.id)}>
                        <IconTrash color='#222' stroke={1.5} style={{ width: '90%', height: '90%' }} />
                      </button>
                    </Tooltip>
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

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    return await createUpdateRole(data)
  } catch (error) {
    return { input: error.message }
  }
}