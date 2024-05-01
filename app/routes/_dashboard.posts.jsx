import { Title } from '@mantine/core';
import PostCard from '../components/dashboard/PostCard';

export default function DashboardPostsPage() {
  return (
    <>
      <div className="mb-8 font-normal">
        <Title order={1}>Posts</Title>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <PostCard
          topic="Test Topic"
          replies={5}
          author="Suraj Kumar"
          postName="Test Post"
          postContent="Forums allow people to create threads, post messages, and respond to existing threads. They can also be used to ask questions, share experiences, and debate solutions to shared problems."
          postDate="2 days ago"
          forumName="Test Forum"
        />
        <PostCard
          topic="Test Topic"
          replies={5}
          author="Suraj Kumar"
          postName="Test Post"
          postContent="Forums allow people to create threads, post messages, and respond to existing threads. They can also be used to ask questions, share experiences, and debate solutions to shared problems."
          postDate="2 days ago"
          forumName="Test Forum"
        />
      </div>
    </>
  );
}
