import { Badge, Button, } from "@mantine/core"
import { Link, json, useLoaderData } from "@remix-run/react"
import DetailLabel from "../components/client/DetailLabel"
import { getTopicBySlug } from "../utils/topic.server"
import PostList from "../components/client/PostList";

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
  const [mainPost, ...posts] = topic.posts

  return (
    <>
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
      <PostList post={mainPost} />
      <div className="flex items-center justify-end gap-x-4 py-4 border-b border-gray-300">
        <DetailLabel title="Posts" value={0} />
        <DetailLabel title="Views" value={0} />
        <Button variant="filled">relay</Button>
        <Button variant="default">edit</Button>
        <Button variant="filled" color="red">delete</Button>
      </div>
      {posts.length ? posts.map(post => <PostList post={post} key={post.id} />) : null}
    </>
  )
}