import { Link, json, useLoaderData } from "@remix-run/react"
import { getForumBySlug } from "../utils/forum.server"
import { Badge } from "@mantine/core"
import { IconRss } from "@tabler/icons-react"

// eslint-disable-next-line no-unused-vars
export const loader = async ({ request, params }) => {
  const { slug } = params
  return json({ forum: await getForumBySlug(slug) })
}

export default function SingleForumPage() {
  const { forum } = useLoaderData()
  return (
    <>
      {console.log(forum)}
      <div className="">
        <h1 className="text-3xl text-gray-900 mb-2">{forum.title}</h1>
        <p className="text-sm text-stone-600">{forum.description}</p>
      </div>
      <div className="flex mt-6">
        <Badge color="violet" size="lg">Tags</Badge>
      </div>
      <div className="flex mt-6 w-full justify-between border-b border-gray-200 pb-4">
        <Link to={''} className="bg-indigo-700 text-white py-2 px-4 text-sm rounded-sm transition-all ease-in active:translate-y-1">
          Create topic
        </Link>
        <div className="flex gap-2">
          <div className="border bg-transparent border-gray-400 flex items-center justify-center px-2 rounded-md gap-x-1 text-stone-600">
            <strong className="text-indigo-700">{forum.topics.length}</strong> Topics
          </div>
          <div className="border bg-transparent border-gray-400 flex items-center justify-center px-2 rounded-md gap-x-1 text-stone-600">
            <strong className="text-indigo-700">{forum.followers.length}</strong> Followers
          </div>
          <button className="border bg-indigo-700 border-indigo-700 flex items-center justify-center px-2 rounded-md gap-x-1 text-white">
            <IconRss /> Follow
          </button>
        </div>
      </div>
    </>
  )
}