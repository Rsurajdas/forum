import { Avatar, Badge, Button } from '@mantine/core';
import DetailLabel from '../components/client/DetailLabel';
import tiptapStyles from '../styles/Tiptap.css?url';
import PostCard from '../components/dashboard/PostCard';
import { IconMoodSmile } from '@tabler/icons-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [show, setShow] = useState(false);
  return (
    <main>
      {/* {"mongodb+srv://surajkumar18294:fSC8goxUB6Cnep75@cluster0.swfxiir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"} */}
      <section className="py-12">
        <div className="xl:container">
          <div className="flex gap-8">
            <div className="w-1/3 relative">
              <div className="">
                <div className="shadow-md rounded-md bg-white p-8 border border-gray-200">
                  <div className="flex items-center flex-col mb-5">
                    <Avatar variant="light" size="xl" color="gray" />
                    <h1 className="text-gray-700 font-semibold text-xl mt-3 mb-2">
                      Suraj Kumar
                    </h1>
                    <div className="flex items-center gap-1">
                      <Badge color="green" radius="sm" size="xs">
                        New
                      </Badge>{' '}
                      -{' '}
                      <small className="text-xs text-gray-700">
                        Senior Web Developer
                      </small>
                    </div>
                  </div>
                  <div className="flex justify-between mb-5">
                    <DetailLabel value={3} title="Posts" />
                    <DetailLabel value={7} title="Profile View" />
                    <DetailLabel value={0} title="Likes" />
                    <DetailLabel value={0} title="Followers" />
                  </div>
                  <div className="text-center text-sm mb-5">
                    <p>
                      Last Online <span className="font-bold">4mth</span>
                    </p>
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
                    <p className={`${!show ? 'line-clamp-3' : ''}`}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iste ea magnam exercitationem nostrum, porro ipsum
                      repudiandae vitae, cumque minima minus atque earum
                      aspernatur rerum nisi cum tempora qui dolor optio? Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Corporis natus vel porro. Reiciendis deserunt sunt, illum
                      sapiente numquam inventore ipsa quae natus iusto voluptate
                      quas cum alias, doloribus fugiat maxime!{' '}
                    </p>
                    <button
                      className="text-blue-800 font-medium"
                      onClick={() => setShow((s) => !s)}
                    >
                      {!show ? 'Read more...' : 'Read less...'}
                    </button>
                  </div>
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
      </section>
    </main>
  );
}

export const links = () => [{ rel: 'stylesheet', href: tiptapStyles }];
