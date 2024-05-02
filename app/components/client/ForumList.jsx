import { Link } from '@remix-run/react';
import DetailLabel from './DetailLabel';

export default function ForumList({
  title,
  description,
  topics,
  posts,
  slug,
  folderName,
}) {
  return (
    <div className="flex justify-between">
      <div className="w-5/6">
        <Link to={`/forums/${folderName}/${slug}`} className="hover:underline">
          <h3 className="text-indigo-700  font-semibold text-lg">{title}</h3>
        </Link>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="w-1/6">
        <div className="flex gap-4 justify-end">
          <DetailLabel value={topics} title="Topics" />
          <DetailLabel value={posts} title="Posts" />
        </div>
      </div>
    </div>
  );
}
