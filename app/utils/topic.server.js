import slugify from 'slugify';
import { prisma } from './database.server';
import { redirect } from '@remix-run/node';

export const createTopic = async (profileId, forumSlug, data) => {
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
        slug: forumSlug,
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

    if (!forumSlug) {
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

    return redirect(`/forums/${forumSlug}`);
  } catch (error) {
    console.log(`Error Occured: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getTopicBySlug = async (slug) => {
  try {
    const topic = await prisma.topic.findUnique({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        file: true,
        islock: true,
        forum: {
          select: {
            permissions: true,
          },
        },
        tags: {
          select: {
            id: true,
            title: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        posts: {
          select: {
            id: true,
            comment: true,
            createdAt: true,
            _count: {
              select: {
                likes: true,
              },
            },
            replies: {
              select: {
                id: true,
                comment: true,
                createdAt: true,
                _count: {
                  select: {
                    likes: true,
                  },
                },
              },
            },
            likes: {
              select: {
                id: true,
                profile: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            posts: true,
            likes: true,
          },
        },
      },
    });

    return topic;
  } catch (error) {
    console.log(`Error: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
