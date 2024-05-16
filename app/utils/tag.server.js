import { prisma } from './database.server';

export const getTagsByForum = async (slug) => {
  try {
    const forumWithTags = await prisma.forum.findFirst({
      where: { slug: slug },
      select: {
        topics: {
          select: {
            tags: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    const allTags = forumWithTags.topics.flatMap((topic) => topic.tags);

    const uniqueTags = allTags.reduce((arr, tag) => {
      if (!arr.find((t) => t.id === tag.id)) {
        arr.push(tag);
      }
      return arr;
    }, []);

    return uniqueTags;
  } catch (error) {
    console.log(`Error occurred ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
