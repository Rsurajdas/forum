import { Link } from '@remix-run/react';
import DetailLabel from './DetailLabel';
import { Avatar, Badge } from '@mantine/core';

export default function TopicList({
  title,
  user,
  views,
  posts,
  slug,
  createdAt,
  profileId,
  tags,
  forumSlug
}) {
  return (
    <div className="flex justify-between w-full items-center p-3">
      <div className="flex items-center gap-x-4 w-full">
        <Avatar variant='default' color='orange'>{user.slice(0, 'ww'.length)}</Avatar>
        <div className="w-5/6">
          <div className="flex items-center gap-x-1">
            {tags.map(tag => (
              <Link key={tag.id} to={``}>
                <Badge color='purple' size='sm'>{tag.title}</Badge>
              </Link>
            ))}
            <Link to={`/forums/${forumSlug}/topic/${slug}`} className="hover:underline">
              <h3 className="text-indigo-700 font-semibold text-lg">{title}</h3>
            </Link>
          </div>
          <small className='flex gap-x-1 items-center'>
            <span>{createdAt}</span>-<span></span>
            <Link to={`/user/${profileId}`} className='text-blue-700 font-semibold hover:underline'>
              <span>{user}</span>
            </Link>
          </small>
        </div>
        <div className="w-1/6">
          <div className="flex gap-6 justify-end">
            <DetailLabel value={posts} title="Posts" />
            <DetailLabel value={views} title="Views" />
          </div>
        </div>
      </div>
    </div>
  );
}
