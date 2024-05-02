import { Link } from '@remix-run/react';

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
        <div className="flex gap-4 text-center justify-end">
          <div className="flex flex-col">
            <span className="font-semibold">{topics}</span>
            <span className="text-gray-500">Topics</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{posts}</span>
            <span className="text-gray-500">Posts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
