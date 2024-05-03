import { ActionIcon, Avatar, Tooltip } from '@mantine/core';
import {
  IconEdit,
  IconEye,
  IconEyeCancel,
  IconMessages,
  IconShieldX,
  IconTrash,
} from '@tabler/icons-react';

export default function PostCard({
  topic,
  replies,
  author,
  postName,
  postDate,
  postContent,
  forumName,
  isAdmin,
}) {
  return (
    <div className="shadow-md bg-white rounded-md">
      <div className="w-full items-center flex justify-between p-6">
        <h3 className="text-xl font-semibold">{topic}</h3>
        <div className="flex text-stone-700 gap-1">
          <IconMessages color="#777" />
          {replies} replies
        </div>
      </div>
      <div className="w-full flex p-6 pt-0 gap-4 items-start">
        <Avatar color="default" radius="md">
          {author
            .split(' ')
            .reduce((subStr, str) => subStr + str[0], '')
            .slice(0, 'ww'.length)}
        </Avatar>
        <div>
          <div>
            <h5 className="font-bold">{postName}</h5>
            <span className="text-xs font-semibold text-blue-800">
              {postDate}
            </span>
          </div>
          <p className="mt-2">{postContent}</p>
        </div>
      </div>
      <div className="flex border-t border-stone-300 px-6 py-4 items-center justify-between">
        <div className="font-semibold">
          Posted in <span className="text-blue-800">{forumName}</span>
        </div>
        {isAdmin && (
          <div className="flex gap-3">
            <Tooltip
              label="Hide"
              position="bottom"
              transitionProps={{ duration: 0 }}
            >
              <ActionIcon
                variant="filled"
                color="dark"
                aria-label="Settings"
                size="lg"
              >
                <IconEyeCancel
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label="Spam"
              position="bottom"
              transitionProps={{ duration: 0 }}
            >
              <ActionIcon
                variant="filled"
                color="orange"
                aria-label="Settings"
                size="lg"
              >
                <IconShieldX
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label="View"
              position="bottom"
              transitionProps={{ duration: 0 }}
            >
              <ActionIcon
                variant="filled"
                color="cyan"
                aria-label="Settings"
                size="lg"
              >
                <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label="Edit"
              position="bottom"
              transitionProps={{ duration: 0 }}
            >
              <ActionIcon
                variant="filled"
                color="blue"
                aria-label="Settings"
                size="lg"
              >
                <IconEdit
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label="Delete"
              position="bottom"
              transitionProps={{ duration: 0 }}
            >
              <ActionIcon
                variant="filled"
                color="red"
                aria-label="Settings"
                size="lg"
              >
                <IconTrash
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
}
