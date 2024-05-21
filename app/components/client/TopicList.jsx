import { Link } from '@remix-run/react';
import DetailLabel from './DetailLabel';
import { Avatar, Badge } from '@mantine/core';
import TimeAgo from './TimeAgo';

export default function TopicList({
  topic,
  forumSlug
}) {
  return (
    <div className="flex justify-between w-full items-center p-3">
      <div className="flex items-center gap-x-4 w-full">
        <Avatar variant='default' color='orange'>{topic.user.name.slice(0, 'ww'.length)}</Avatar>
        <div className="w-5/6">
          <div className="flex items-center gap-x-1">
            {topic.tags.map(tag => (
              <Link key={tag.id} to={``}>
                <Badge color='purple' size='sm'>{tag.title}</Badge>
              </Link>
            ))}
            <Link to={`/forums/${forumSlug}/topic/${topic.slug}`} className="hover:underline">
              <h3 className="text-indigo-700 font-semibold text-lg">{topic.title}</h3>
            </Link>
          </div>
          <small className='flex gap-x-1 items-center'>
            <TimeAgo date={topic.createdAt} />-<span></span>
            <Link to={`/user/${topic.user.id}`} className='text-blue-700 font-semibold hover:underline'>
              <span>{topic.user.name}</span>
            </Link>
          </small>
        </div>
        <div className="w-1/6">
          <div className="flex gap-6 justify-end">
            <DetailLabel value={topic._count.posts} title="Posts" />
            <DetailLabel value={topic.views} title="Views" />
          </div>
        </div>
      </div>
    </div>
  );
}
