import { Link } from '@remix-run/react';
import DetailLabel from './DetailLabel';

export default function ForumList({
  title,
  description,
  topicCount,
  postCount,
  slug
}) {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="w-5/6">
        <Link to={`/forums/${slug}`} className="hover:underline">
          <h3 className="text-indigo-700 font-semibold text-lg">{title}</h3>
        </Link>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="w-1/6">
        <div className="flex gap-6 justify-end">
          <DetailLabel value={topicCount} title="Topics" />
          <DetailLabel value={postCount} title="Posts" />
        </div>
      </div>
    </div>
  );
}
