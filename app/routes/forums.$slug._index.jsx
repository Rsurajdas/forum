import { Link, json, useFetcher, useLoaderData, useParams } from "@remix-run/react"
import { followUnfollowForum, getForumBySlug } from "../utils/forum.server"
import { Badge } from "@mantine/core"
import { IconRss } from "@tabler/icons-react"
import TopicList from "../components/client/TopicList"
import { getTagsByForum } from "../utils/tag.server"
import { getUserFromSession } from "../utils/auth.server"
import { useEffect, useState } from "react"

// eslint-disable-next-line no-unused-vars
export const loader = async ({ request, params }) => {
  const { slug } = params

  return json(
    {
      forum: await getForumBySlug(slug),
      tags: await getTagsByForum(slug),
      profileId: await getUserFromSession(request)
    }
  )
}

export default function SingleForumPage() {
  const { forum, tags, profileId } = useLoaderData()
  const { slug } = useParams()
  const fetcher = useFetcher()
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowForum = () => {
    fetcher.submit(null, {
      method: "PATCH"
    })
    setIsFollowing(prevState => !prevState)
  }

  useEffect(() => {
    if (forum.subscribersId.some(id => id === profileId)) {
      setIsFollowing(true)
    }
  }, [forum.subscribersId, profileId])

  return (
    <>
      <div className="mb-2">
        <h1 className="text-3xl text-gray-900">{forum.title}</h1>
        <p className="text-sm text-stone-600 mt-3">{forum.description}</p>
      </div>
      <div className="flex mt-6 gap-x-2">
        {tags?.map(tag => (
          <Link to={`/${tag.id}`} key={tag.id}>
            <Badge color="violet" size="lg">{tag.title}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="flex mt-10 w-full justify-between border-b border-gray-200 pb-4">
        {forum?.permissions.createTopic
          ? (
            <Link to={`/forums/${slug}/topic/create`} className="bg-indigo-700 text-white py-2 px-4 text-sm rounded-sm transition-all ease-in active:translate-y-1">
              Create topic
            </Link>)
          : null
        }
        <div className="flex gap-2">
          <div className="border bg-transparent border-gray-400 flex items-center justify-center px-2 rounded-md gap-x-1 text-stone-600">
            <strong className="text-indigo-700">{forum?._count.topics}</strong> Topics
          </div>
          <div className="border bg-transparent border-gray-400 flex items-center justify-center px-2 rounded-md gap-x-1 text-stone-600">
            <strong className="text-indigo-700">
              {forum?._count.subscribers}
            </strong>
            Followers
          </div>
          <button
            className="border bg-indigo-700 border-indigo-700 flex items-center justify-center px-2 rounded-md gap-x-1 text-white"
            onClick={() => handleFollowForum()}
          >
            <IconRss /> {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {forum?.topics.map(topic => (
          <TopicList
            key={topic?.id}
            topic={topic}
            forumSlug={slug}
          />
        ))}
      </div>
    </>
  )
}

export const action = async ({ request, params }) => {
  const { slug } = params
  const profileId = await getUserFromSession(request)
  return await followUnfollowForum(slug, profileId)
}