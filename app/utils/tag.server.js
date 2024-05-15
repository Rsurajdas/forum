import { prisma } from './database.server';

export const getTagsByForumId = async (forumId) => {
  try {
    if (!forumId) {
      const error = new Error('Invalid forumId, forumId must not be empty.');
      error.statusCode = 404;
      throw error;
    }

    return await prisma.tag.findMany({
      where: {
        forum: {
          id: forumId,
        },
      },
    });
  } catch (error) {
    console.log(`Error occurred ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
