import { Avatar, Badge, Button, Popover } from "@mantine/core"
import { Link, json, useLoaderData } from "@remix-run/react"
import { IconDotsVertical, IconThumbUp } from "@tabler/icons-react"
import DetailLabel from "../components/client/DetailLabel"
import { getTopicBySlug } from "../utils/topic.server"

// eslint-disable-next-line no-unused-vars
export const loader = async ({ request, params }) => {
  const { slug } = params
  return json(
    {
      topic: await getTopicBySlug(slug)
    }
  )
}

export default function TopicIndex() {
  const { topic } = useLoaderData()

  return (
    <>
      {console.log(topic)}
      <div>
        <h1 className="text-3xl text-gray-900">{topic?.title}</h1>
      </div>
      <div className="flex mt-4 gap-x-2">
        {topic.tags?.map(tag => (
          <Link to={`/${tag?.id}`} key={tag?.id}>
            <Badge color="violet" size="lg">{tag?.title}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="flex mt-8 gap-x-4 border-b border-gray-300 pb-6">
        <Avatar variant='default' color='orange' size="lg">{topic.user.name.slice(0, "ww".length)}</Avatar>
        <div className="flex flex-col">
          <div className="text-gray-700">
            <div className=" mb-6">
              <Link to="/">
                <h3>{topic.posts[0].user.name}</h3>
              </Link>
              <span>13d</span>
            </div>
            <div className="">
              {topic.posts[0].comment}
            </div>
          </div>
          <div className="flex mt-20 justify-end gap-x-2">
            <div className="">
              <small className="text-gray-500 inline-block mr-2">0 likes</small>
              <Button variant="default" size="sm">
                <IconThumbUp stroke={1.5} />
              </Button>
            </div>
            <Button variant="default" size="sm" className="text-gray-700">
              reply
            </Button>
            <Popover width={200} trapFocus position="top-end">
              <Popover.Target>
                <Button variant="default" size="sm">
                  <IconDotsVertical />
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <button className="text-gray-900">
                  Edit
                </button>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-4 py-4 border-b border-gray-300">
        <DetailLabel title="Posts" value={0} />
        <DetailLabel title="Views" value={0} />
        <Button variant="filled">relay</Button>
        <Button variant="default">edit</Button>
        <Button variant="filled" color="red">delete</Button>
      </div>
    </>
  )
}