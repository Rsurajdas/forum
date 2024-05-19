import slugify from 'slugify';
import { prisma } from './database.server';
import { json } from '@remix-run/node';

export const createFolder = async (data) => {
  try {
    if (!data.title) {
      const error = new Error('Invalid title, title must not be empty.');
      error.statusCode = 404;
      throw error;
    }

    return await prisma.folder.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status === 'on',
        position: +data.position,
        slug: slugify(data.title, { lower: true }),
      },
    });
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllFolders = async () => {
  try {
    const folders = await prisma.folder.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        position: true,
        slug: true,
        forums: {
          orderBy: {
            position: 'asc',
          },
          select: {
            id: true,
            title: true,
            description: true,
            position: true,
            slug: true,
            _count: {
              select: {
                topics: true,
              },
            },
            topics: {
              select: {
                _count: {
                  select: {
                    posts: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    });

    const result = folders.map((folder) => {
      return {
        ...folder,
        forums: folder.forums.map((forum) => {
          const postCount = forum.topics.reduce(
            (total, topic) => total + topic._count.posts,
            0
          );
          return {
            ...forum,
            topicCount: forum._count.topics,
            postCount,
          };
        }),
      };
    });

    return json({ folders: result });
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getFolderBySlug = async (slug) => {
  try {
    const folder = await prisma.folder.findUnique({
      where: {
        slug: slug,
      },
      include: {
        forums: true,
      },
    });

    if (!folder) {
      throw new Response(null, {
        status: 404,
        statusText: 'Oops! This Page Could Not Be Found',
      });
    }

    return folder;
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
