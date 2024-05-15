import slugify from 'slugify';
import { prisma } from './database.server';
import { json } from '@remix-run/react';

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
        },
      },
      orderBy: {
        position: 'asc',
      },
    });
    const topicCounts = await prisma.forum.findMany({
      select: {
        parent: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            topics: true,
          },
        },
      },
    });
    const result = folders.map((folder) => {
      const topicCount = topicCounts.find(
        (topicCount) => topicCount.parent.id === folder.id
      );
      return {
        ...folder,
        topicCounts: topicCount?._count?.topics || 0,
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
    return await prisma.folder.findUnique({
      where: {
        slug: slug,
      },
      include: {
        forums: true,
      },
    });
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
