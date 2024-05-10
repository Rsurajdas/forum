import { Button, Checkbox, Select, Switch, Table, TextInput, Textarea, Title, Tooltip } from "@mantine/core";
import { Form, useNavigate } from "@remix-run/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";

export default function ForumCreatePage() {
  const navigate = useNavigate()
  const [value, setValue] = useState(null);
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="mb-8">
        <Tooltip label="back" position="top">
          <Button variant="light" size="compact-md" color="indigo" onClick={() => navigate(-1)}>
            <IconArrowLeft />
          </Button>
        </Tooltip>
      </div>
      <div className="mb-6">
        <Title order={2} style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` }}>Create new forum</Title>
      </div>
      <Form method="post">
        <div className="flex gap-6 items-start">
          <div className="w-2/3 bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col gap-4">
            <Select
              label="Parent"
              placeholder="Choose forum"
              data={[
                { value: 'react', label: 'React library' },
                { value: 'remix', label: 'Remix framework' },
                { value: 'Next', label: 'Next framework' }
              ]}
              value={value ? value.value : null}
              onChange={(_value, option) => setValue(option)}
              clearable
              name="parent"
            />

            <TextInput label="Title" withAsterisk name="title" />

            <Textarea label="Description" resize="vertical" name="description" />
          </div>
          <div className="w-1/3 bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm">Status</span>
              <Switch
                checked={checked}
                color="indigo"
                label={checked ? "Enabled" : "Disabled"}
                onChange={(e) => setChecked(e.currentTarget.checked)}
                name="status"
              />
            </div>
            <TextInput label="Position" name="position" />
          </div>
        </div>
        <div className="mt-6 mb-3">
          <Title order={3} style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` }}>Permissions</Title>
        </div>
        <div className="flex">
          <div className="w-2/3 bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col gap-4">
            <Table highlightOnHover withTableBorder withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th />
                  <Table.Th>Guest</Table.Th>
                  <Table.Th>Registed</Table.Th>
                  <Table.Th>Moderators</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>View public contents</Table.Td>
                  <Table.Td>
                    <Checkbox name="permissionGuest1" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="permissionUser1" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="permissionModerator1" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>View public contents</Table.Td>
                  <Table.Td>
                    <Checkbox name="permissionGuest2" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="permissionUser2" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="permissionModerator2" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>View public contents</Table.Td>
                  <Table.Td>
                    <Checkbox name="permissionGuest3" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="permissionUser3" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="permissionModerator3" />
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </div>
        </div>
        <div className="flex mt-6">
          <div className="w-2/3 bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col gap-4">
            <Select
              label="Moderator"
              placeholder="Choose forum"
              data={[
                { value: 'react', label: 'React library' },
                { value: 'remix', label: 'Remix framework' },
                { value: 'Next', label: 'Next framework' }
              ]}
              value={value ? value.value : null}
              onChange={(_value, option) => setValue(option)}
              clearable
              name="moderator"
            />
          </div>
        </div>
        <div className="flex mt-6 border-t border-gray-200 pt-4 justify-end">
          <button className="bg-indigo-700 text-white py-3 px-8 rounded-sm">Submit</button>
        </div>
      </Form>
    </>
  )
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  return data
}