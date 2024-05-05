import { json } from "@remix-run/node";
import { prisma } from "./database.server";

export const getProfile = async (userId) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
      include: {
        User: {
          select: {
            createdAt: true,
            lastLoggedin: true,
          },
        },
      },
    });
    return json({ status: "Success", profile });
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);

    if (error.statusCode) {
      console.error(`Status Code: ${error.statusCode}`);
    }

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
