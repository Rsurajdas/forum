import { prisma } from './database.server';

export const likeDisLikeTopic = async (slug, profileId) => {
  try {
    if (!profileId) {
      throw new Error('Profile id is required');
    }

    const topic = await prisma.topic.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        likes: true,
      },
    });

    if (!topic) {
      throw new Error('Topic not found');
    }

    const isLiked = topic.likes.some((like) => like.profileId === profileId);

    if (!isLiked) {
      return await prisma.like.create({
        data: {
          profile: {
            connect: {
              id: profileId,
            },
          },
          topic: {
            connect: {
              id: topic.id,
            },
          },
        },
      });
    } else {
      const likeEntry = await prisma.like.findFirst({
        where: {
          profileId,
          topicId: topic.id,
        },
      });

      if (!likeEntry) {
        throw new Error('Like entry not found');
      }

      return await prisma.like.delete({
        where: {
          id: likeEntry.id,
        },
      });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
