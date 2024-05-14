import { json } from '@remix-run/node';
import { prisma } from './database.server';

export const getProfile = async (profileId) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        user: {
          select: {
            createdAt: true,
            lastLoggedin: true,
          },
        },
        roles: true,
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
