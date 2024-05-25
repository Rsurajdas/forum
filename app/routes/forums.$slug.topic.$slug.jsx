import { Badge, Button, } from "@mantine/core"
import { Link, json, useLoaderData } from "@remix-run/react"
import DetailLabel from "../components/client/DetailLabel"
import { getTopicBySlug } from "../utils/topic.server"
import PostList from "../components/client/PostList";
import { getUserFromSession } from "../utils/auth.server";
import { useEffect, useState } from "react";
import { likeDisLikeTopic } from "../utils/like.server";

export const loader = async ({ request, params }) => {
  const { slug } = params
  return json(
    {
      topic: await getTopicBySlug(slug),
      profileId: await getUserFromSession(request)
    }
  )
}

export default function TopicIndex() {
  const { topic, profileId } = useLoaderData()
  const [isLiked, setIsLikes] = useState(false)

  useEffect(() => {
    if (topic.likes.some(like => like.profileId === profileId)) {
      setIsLikes(true)
    }
  }, [profileId, topic.likes])

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
      <PostList post={topic} isLiked={isLiked} setIsLikes={setIsLikes} />
      <div className="flex items-center justify-end gap-x-4 py-4 border-b border-gray-300">
        <DetailLabel title="Posts" value={0} />
        <DetailLabel title="Views" value={0} />
        <Button variant="filled">relay</Button>
        <Button variant="default">edit</Button>
        <Button variant="filled" color="red">delete</Button>
      </div>
      {topic.posts.length
        ? topic.posts.map(post => <PostList post={post} key={post.id} />)
        : null
      }
    </>
  )
}

export const action = async ({ request, params }) => {
  const profileId = await getUserFromSession(request)
  const { slug } = params
  return await likeDisLikeTopic(slug, profileId)
}