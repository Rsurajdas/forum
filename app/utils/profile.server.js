import { json } from '@remix-run/node';
import { prisma } from './database.server';

export const getProfile = async (userId) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            createdAt: true,
            lastLoggedin: true,
          },
        },
        role: true,
      },
    });
    return json({ profile });
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);

    if (error.statusCode) {
      console.log(`Status Code: ${error.statusCode}`);
    }

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getProfileByRole = async (roleName) => {
  return await prisma.profile.findMany({
    where: {
      role: {
        title: roleName,
      },
    },
    include: {
      role: true,
    },
  });
};
