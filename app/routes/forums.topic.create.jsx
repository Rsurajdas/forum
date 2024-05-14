import { TagsInput, TextInput, Title, } from "@mantine/core";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import Tiptap from "../components/client/Tiptap"
import tiptapStyles from "../styles/Tiptap.css?url"
import { useState } from "react";

export default function TopicCreatePage() {
  const navigation = useNavigation()
  const submit = useSubmit()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: ["react"]
  })

  const handleformData = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value, }))
  }
  const handleChange = (fieldname, value) => {
    setFormData((prevState) => ({ ...prevState, [fieldname]: value }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    submit(formData, {
      method: "POST",
    })
  }

  return (
    <>
      <div className="mb-6">
        <Title order={2} className="text-gray-600" style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` }}>Create new forum</Title>
      </div>
      <Form method="post" className="flex flex-col gap-y-4" onSubmit={e => handleSubmit(e)}>
        <TextInput label="Title" name="title" value={formData.title} onChange={(e) => handleformData(e)} />

        <div className="form-group">
          <label htmlFor="content">
            Content
          </label>
          <Tiptap fieldname="content" content={formData.content} handleChange={handleChange} />
        </div>

        <TagsInput label="Tags" value={formData.tags} onChange={(value) => handleChange('tags', value)} />

        <div className="flex mt-6 border-t border-gray-200 pt-4 justify-end">
          <button className="bg-indigo-700 text-white py-3 px-8 rounded-sm">{navigation.state === "loading" ? "Submitting..." : 'Submit'}</button>
        </div>
      </Form>
    </>
  )
}

export const links = () => [{ rel: "stylesheet", href: tiptapStyles }]

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  return null
}