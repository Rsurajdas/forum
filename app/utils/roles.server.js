import { prisma } from "./database.server";

export const createUpdateRole = async (data) => {
  try {
    const { title, description } = data;
    return await prisma.role.upsert({
      where: {
        title: data.title,
      },
      update: {
        title,
        description,
      },
      create: {
        title,
        description,
      },
    });
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

export const getAllRoles = async () => {
  try {
    return await prisma.role.findMany();
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

export const getRolesById = async (roleId) => {
  try {
    return await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });
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

export const deleteRoleById = async (roleId) => {
  try {
    return await prisma.role.delete({
      where: {
        id: roleId,
      },
    });
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
