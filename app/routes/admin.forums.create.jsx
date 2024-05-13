import { Button, Checkbox, Select, Switch, Table, TextInput, Textarea, Title, Tooltip } from "@mantine/core";
import { Form, json, useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { getAllRegistedUser } from "../utils/user.server";
import { getAllFolders } from "../utils/folder.server";
import { getUserFromSession } from "../utils/auth.server";
import { createForum } from "../utils/forum.server";

export const loader = async () => {
  return json({ users: await getAllRegistedUser(), folders: await getAllFolders() })
}

export default function ForumCreatePage() {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(true);
  const { users, folders } = useLoaderData()
  const navigation = useNavigation()

  return (
    <>
      {console.log(navigation)}
      <div className="mb-8">
        <Tooltip label="back" position="top">
          <Button variant="light" size="compact-md" color="indigo" onClick={() => navigate('..')}>
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
              data={folders.map(folder => ({ value: folder.id, label: folder.title }))}
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
                    <Checkbox defaultChecked name="viewContent_guest" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked name="viewContent_user" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>View hidden topics</Table.Td>
                  <Table.Td colSpan={3} style={{ textAlign: "center" }} className="bg-stone-100 text-stone-400">
                    Only Moderator
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Create new topics</Table.Td>
                  <Table.Td>
                    <Checkbox disabled size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="createTopic" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Upload files</Table.Td>
                  <Table.Td>
                    <Checkbox disabled size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="uploadFiles" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>New topics will be approved automatically</Table.Td>
                  <Table.Td>
                    <Checkbox disabled size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="autoApproveTopic" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Edit my own topics</Table.Td>
                  <Table.Td>
                    <Checkbox disabled size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="editTopic" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Edit any topics</Table.Td>
                  <Table.Td colSpan={3} style={{ textAlign: "center" }} className="bg-stone-100 text-stone-400">
                    Only Moderator
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Delete my own topics</Table.Td>
                  <Table.Td>
                    <Checkbox disabled size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="deleteTopic" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Delete any topics</Table.Td>
                  <Table.Td colSpan={3} style={{ textAlign: "center" }} className="bg-stone-100 text-stone-400">
                    Only Moderator
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Comment on open topics</Table.Td>
                  <Table.Td>
                    <Checkbox disabled size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="commentOnOpenTopic" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Comment on locked topics</Table.Td>
                  <Table.Td colSpan={3} style={{ textAlign: "center" }} className="bg-stone-100 text-stone-400">
                    Only Moderator
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>New comments will be approved automatically</Table.Td>
                  <Table.Td>
                    <Checkbox disabled size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="autoApproveComment" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Edit my own comments</Table.Td>
                  <Table.Td>
                    <Checkbox disabled size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="editComment" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Edit any comments</Table.Td>
                  <Table.Td colSpan={3} style={{ textAlign: "center" }} className="bg-stone-100 text-stone-400">
                    Only Moderator
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Delete my own comments</Table.Td>
                  <Table.Td>
                    <Checkbox disabled size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox name="deleteComment" size="xs" />
                  </Table.Td>
                  <Table.Td>
                    <Checkbox defaultChecked disabled size="xs" />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Delete any comments</Table.Td>
                  <Table.Td colSpan={3} style={{ textAlign: "center" }} className="bg-stone-100 text-stone-400">
                    Only Moderator
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
              placeholder="Choose moderator"
              data={users?.profiles.map(profile => ({ value: profile.id, label: profile.name }))}
              clearable
              name="moderator"
            />
          </div>
        </div>
        <div className="flex mt-6 border-t border-gray-200 pt-4 justify-end">
          <button className="bg-indigo-700 text-white py-3 px-8 rounded-sm">{navigation.state === "loading" ? "Submitting..." : 'Submit'}</button>
        </div>
      </Form>
    </>
  )
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const userId = await getUserFromSession(request)
  return await createForum(data, userId)
}