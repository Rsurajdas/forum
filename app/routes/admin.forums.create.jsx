import { Button, Select, Switch, TextInput, Textarea, Title, Tooltip } from "@mantine/core";
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
      <Form>
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
            />

            <TextInput label="Title" withAsterisk />

            <Textarea label="Description" resize="vertical" />
          </div>
          <div className="w-1/3 bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm">Status</span>
              <Switch
                checked={checked}
                color="indigo"
                label={checked ? "Enabled" : "Disabled"}
                onChange={(e) => setChecked(e.currentTarget.checked)}
              />
            </div>
            <TextInput label="Position" />
          </div>
        </div>
      </Form>
    </>
  )
}