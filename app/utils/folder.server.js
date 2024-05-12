import { prisma } from './database.server';

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
    return await prisma.folder.findMany({
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