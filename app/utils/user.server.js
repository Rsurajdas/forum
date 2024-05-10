import { prisma } from './database.server';

export const getAllRegistedUser = async () => {
  try {
    return await prisma.role.findUnique({
      where: {
        title: 'User',
      },
      include: {
        profiles: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
