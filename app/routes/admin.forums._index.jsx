import { Button, Title, } from "@mantine/core";
import { Link, useNavigate } from "@remix-run/react";
import { IconEdit, IconEye, } from "@tabler/icons-react";
import ForumList from "../components/client/ForumList";

const folders = [
  {
    folder: 'Community',
    position: 1,
    forums: [
      {
        id: '1',
        title: 'Pre-Sales Questions',
        description: 'Any pre-sales questions are welcome here!',
        topics: 3,
        posts: 5,
      },
      {
        id: '2',
        title: 'General Discussion',
        description:
          'Talk about all things regarding Our products and e-commerce',
        topics: 0,
        posts: 0,
      },
      {
        id: '3',
        title: 'Announcements',
        description: 'News, Announcements, Promotions',
        topics: 2,
        posts: 3,
      },
    ],
  },
  {
    folder: 'Purchase Support',
    position: 2,
    forums: [
      {
        id: '1',
        title: 'Request and Wishlist',
        description: 'What products would you like to buy.',
        topics: 0,
        posts: 0,
      },
      {
        id: '2',
        title: 'Shipping, payment and warranty',
        description: 'All about shipping, payment and warranty',
        topics: 0,
        posts: 0,
      },
      {
        id: '3',
        title: 'Customer Center',
        description:
          'Only for customers who have purchased the product at the store',
        topics: 0,
        posts: 0,
      },
    ],
  },
  {
    folder: 'New launch',
    position: 0,
    forums: [
      {
        id: '1',
        title: 'Test Forum',
        description: 'Test Description',
        topics: 1,
        posts: 1,
      },
    ],
  },
];

const sortedFolders = folders.sort((a, b) => a.position - b.position)

export default function AdminForumsIndexPage() {
  const navigate = useNavigate()

  return (
    <>
      <div className="mb-8 flex justify-between w-full">
        <Title order={1} style={{ fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` }}>Forums</Title>
        <div className="flex gap-x-4">
          <Button variant="filled" color="gray">Create New Folder</Button>
          <Button variant="filled" color="indigo" onClick={() => navigate("/admin/forums/create")}>Create Forum</Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-6">
        {sortedFolders.map((folder, idx) => <div key={idx} className="border border-gray-300 rounded-md shadow-sm bg-white w-full">
          <div className="flex justify-between w-full py-3 px-6 items-center border-b border-gray-100">
            <Link to="/">
              <h3>{folder.folder}</h3>
            </Link>
            <div className="flex gap-x-4">
              <Button variant="light" color="indigo" size="compact-md"><IconEye /></Button>
              <Button variant="filled" color="indigo" size="compact-md"><IconEdit /></Button>
            </div>
          </div>
          {folder.forums.map(forum => (
            <div key={forum.id} className="flex gap-y-4 w-full py-3 px-6 items-center gap-x-8">
              <ForumList {...forum} />
              <div className="flex gap-x-4">
                <Button variant="light" color="indigo" size="compact-md"><IconEye /></Button>
                <Button variant="filled" color="indigo" size="compact-md"><IconEdit /></Button>
              </div>
            </div>))}
        </div>)}
      </div>
    </>
  )
}