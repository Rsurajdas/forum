import { Avatar, Badge, Button, Popover } from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconDotsVertical, IconThumbUp } from "@tabler/icons-react"
import DetailLabel from "../components/client/DetailLabel"

export default function TopicIndex() {
  const { topic } = {}
  const tags = [{ id: 1, title: "tags" }]
  return (
    <>
      <div>
        <h1 className="text-3xl text-gray-900">{topic?.title || 'title'}</h1>
      </div>
      <div className="flex mt-4 gap-x-2">
        {tags?.map(tag => (
          <Link to={`/${tag?.id}`} key={tag?.id}>
            <Badge color="violet" size="lg">{tag?.title}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="flex mt-8 gap-x-4 border-b border-gray-300 pb-6">
        <Avatar variant='default' color='orange' size="lg">SK</Avatar>
        <div className="flex flex-col">
          <div className="text-gray-700">
            <div className=" mb-6">
              <Link to="/">
                <h3>Suraj kumar</h3>
              </Link>
              <span>13d</span>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quisquam? Repudiandae, excepturi? Fugit cumque, a esse nulla quidem inventore, quos praesentium blanditiis architecto, enim earum libero et culpa accusamus quae.</p>
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