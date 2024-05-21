import { Avatar, Button, Popover } from "@mantine/core";
import TimeAgo from "./TimeAgo";
import { IconDotsVertical, IconThumbUp } from "@tabler/icons-react";
import { Link } from "@remix-run/react";
import parse from 'html-react-parser';


export default function PostList({ post }) {
  return (
    <div className="flex mt-8 gap-x-4 border-b border-gray-300 pb-6">
      <Avatar variant='default' color='orange' size="lg">{post.user.name.slice(0, "ww".length)}</Avatar>
      <div className="flex flex-col w-full">
        <div className="text-gray-700">
          <div className="mb-4">
            <Link to={`/user/${post.user.id}`}>
              <h3 className="text-xl">{post.user.name}</h3>
            </Link>
            <TimeAgo date={post.createdAt} />
          </div>
          <div className="topic-content">
            {parse(post.comment)}
          </div>
        </div>
        <div className="flex mt-20 justify-end gap-x-2">
          <div className="">
            <small className="text-gray-500 inline-block mr-2">{post._count.likes} likes</small>
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
  )
}
