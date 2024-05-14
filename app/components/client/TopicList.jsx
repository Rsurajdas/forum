import { Link } from '@remix-run/react';
import DetailLabel from './DetailLabel';
import { Avatar, Badge } from '@mantine/core';

export default function TopicList({
  title,
  user,
  topics,
  posts,
  slug,
  createdAt
}) {
  return (
    <div className="flex justify-between w-full items-center p-3">
      <div className="flex items-center gap-x-4 w-full">
        <Avatar variant='default' color='orange'>Sk</Avatar>
        <div className="w-5/6">
          <div className="flex items-center gap-x-2">
            <Badge color='teal' size='sm'>Tag</Badge>
            <Link to={`/forums/${slug}`} className="hover:underline">
              <h3 className="text-indigo-700 font-semibold text-lg">{title}</h3>
            </Link>
          </div>
          <small className='flex gap-x-1'>
            <span>{createdAt}</span>
            <Link to="" className='text-blue-700 font-semibold hover:underline'>
              <span>{user}</span>
            </Link>
          </small>
        </div>
        <div className="w-1/6">
          <div className="flex gap-6 justify-end">
            <DetailLabel value={posts} title="Posts" />
            <DetailLabel value={topics} title="Views" />
          </div>
        </div>
      </div>
    </div>
  );
}
