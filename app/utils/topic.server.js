import slugify from 'slugify';
import { prisma } from './database.server';
import { redirect } from '@remix-run/react';

export const createTopic = async (profileId, slug, data) => {
  try {
    if (!data.title) {
      const error = new Error('Invalid title, title must not be empty.');
      error.statusCode = 404;
      throw error;
    }

    if (!data.tags) {
      const error = new Error('Invalid tags, tags must not be empty.');
      error.statusCode = 404;
      throw error;
    }

    const forum = await prisma.forum.findUnique({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        permissions: {
          select: {
            autoApproveTopic: true,
          },
        },
      },
    });

    if (!forum) {
      const error = new Error('Invalid forumId, forumId must not be empty.');
      error.statusCode = 404;
      throw error;
    }

    const tags = data.tags.split(',');

    await prisma.topic.create({
      data: {
        title: data.title,
        slug: slugify(data.title, { lower: true }),
        forum: {
          connect: {
            id: forum.id,
          },
        },
        status: forum.permissions.autoApproveTopic,
        islock: false,
        user: {
          connect: {
            id: profileId,
          },
        },
        posts: {
          create: {
            comment: data.content,
            user: { connect: { id: profileId } },
          },
        },
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: {
              title: tag,
            },
            create: {
              title: tag,
            },
          })),
        },
      },
    });

    return redirect(`/forums/${slug}`);
  } catch (error) {
    console.log(`Error Occured: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
