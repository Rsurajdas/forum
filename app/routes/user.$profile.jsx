import { Avatar, Badge, Button, Spoiler } from '@mantine/core';
import DetailLabel from '../components/client/DetailLabel';
import PostCard from '../components/dashboard/PostCard';
import { IconMoodSmile } from '@tabler/icons-react';
import { getProfile } from '../utils/profile.server';
import { useLoaderData } from '@remix-run/react';
import date from "date-and-time"

// eslint-disable-next-line no-unused-vars
export const loader = ({ request, params }) => {
  const { profile } = params
  return getProfile(profile)
}

export default function ProfilePage() {
  const { profile } = useLoaderData()

  return (
    <div className="xl:container">
      <div className="flex gap-8">
        <div className="w-1/3 relative">
          <div className="shadow-md rounded-md bg-white p-8 border border-gray-200">
            <div className="flex items-center flex-col mb-5">
              <Avatar variant="light" size="xl" color="gray" />
              <h1 className="text-gray-700 font-semibold text-xl mt-3 mb-2">
                {profile?.name}
              </h1>
              <div className="flex items-center gap-1">
                <Badge color={profile?.isUserLive ? "green" : "gray"} radius="sm" size="xs">
                  {profile?.isUserLive ? "Online" : "Offline"}
                </Badge>{' '}
                {profile?.title ? <small className="text-xs text-gray-700">
                  - {profile?.title}
                </small> : null}
              </div>
            </div>
            <div className="flex justify-between mb-5">
              <DetailLabel value={3} title="Posts" />
              <DetailLabel value={profile?.profileViews} title="Profile Views" />
              <DetailLabel value={profile?.likes} title="Likes" />
              <DetailLabel value={profile?.followedByIds.length} title="Followers" />
            </div>
            <div className="text-sm mb-5 flex items-center justify-center gap-x-2">
              <p>
                Joined at <span className="font-bold">{Math.round(date.subtract(new Date(Date.now()), new Date(profile?.user.createdAt)).toHours())}hours ago</span>
              </p>
              {!profile?.isUserLive ? <>
                <span>|</span>
                <p>
                  Last Online <span className="font-bold">4mth</span>
                </p>
              </> : null}
            </div>
            <div className="flex justify-center">
              <Button variant="default" size="xs">
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="shadow-md rounded-md bg-white border border-gray-200 mt-4">
            <div className="bg-gray-100 py-2 px-4 text-gray-800 text-md font-medium">
              <p className="flex items-center gap-1">
                <IconMoodSmile size={20} color="#444" />
                About me
              </p>
            </div>
            <div className="py-2 px-4 bg-white font-md">
              <Spoiler maxHeight={80} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Iste ea magnam exercitationem nostrum, porro ipsum
                repudiandae vitae, cumque minima minus atque earum
                aspernatur rerum nisi cum tempora qui dolor optio? Lorem
                ipsum dolor, sit amet consectetur adipisicing elit.
                Corporis natus vel porro. Reiciendis deserunt sunt, illum
                sapiente numquam inventore ipsa quae natus iusto voluptate
                quas cum alias, doloribus fugiat maxime!
              </Spoiler>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <div className="grid grid-cols-1 gap-6">
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
        </div>
      </div>
    </div>
  );
}

