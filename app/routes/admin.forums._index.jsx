import { Button, Modal, Switch, TextInput, Textarea, Title, } from "@mantine/core";
import { Form, Link, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { IconEdit, IconEye, } from "@tabler/icons-react";
import ForumList from "../components/client/ForumList";
import { useEffect, useState } from "react";
import { createFolder, getAllFolders } from "../utils/folder.server";

export const loader = async () => {
  return await getAllFolders()
}

export default function AdminForumsIndexPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("create")
  const [create, setCreate] = useState(query)
  const [checked, setChecked] = useState(false)
  const folders = useLoaderData()
  const sortedFolders = folders.sort((a, b) => a.position - b.position)

  useEffect(() => {
    if (query) {
      setCreate(c => !c)
    }
  }, [query])

  return (
    <>
      <Modal
        opened={create}
        onClose={() => {
          setCreate((c => !c));
          setSearchParams((prev) => prev.delete("create"));
        }}
        title="Create folder"
        size="xl"
      >
        <Form method="post">
          <div className="flex gap-6 items-start">
            <div className="w-2/3 bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col gap-4">
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
          <div className="flex mt-6 border-t border-gray-200 pt-4 justify-end">
            <button className="bg-indigo-700 text-white py-3 px-8 rounded-sm">Submit</button>
          </div>
        </Form>
      </Modal>
      <div className="mb-8 flex justify-between w-full">
        <Title order={1} style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` }}>Forums</Title>
        <div className="flex gap-x-4">
          <Form>
            <button className="bg-indigo-100 text-indigo-700 h-9 px-[18px] rounded-[4px] transition-all ease-in active:translate-y-1" name="create" value="folder">Create New Folder</button>
          </Form>
          <Button variant="filled" color="indigo" onClick={() => navigate("/admin/forums/create")}>Create Forum</Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-4">
        {sortedFolders.map((folder, idx) => <div key={idx} className="border border-gray-300 rounded-md shadow-sm bg-white w-full">
          <div className="flex justify-between w-full py-3 px-6 items-center border-b border-gray-100">
            <Link to="/">
              <h3>{folder.title}</h3>
            </Link>
            <div className="flex gap-x-4">
              <Button variant="light" color="indigo" size="compact-md"><IconEye /></Button>
              <Button variant="filled" color="indigo" size="compact-md"><IconEdit /></Button>
            </div>
          </div>
          {folder.forums.map(forum => (
            <div key={forum.id} className="flex gap-y-4 w-full py-3 px-6 items-center gap-x-8">
              <ForumList {...forum} />
              <div className="flex gap-x-4">
                <Button variant="light" color="indigo" size="compact-md"><IconEye /></Button>
                <Button variant="filled" color="indigo" size="compact-md"><IconEdit /></Button>
              </div>
            </div>))}
        </div>)}
      </div>
    </>
  )
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    return createFolder(data)
  } catch (error) {
    return error
  }
}