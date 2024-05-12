import { redirect } from '@remix-run/react';
import { prisma } from './database.server';

export const createForum = async (data, userId) => {
  try {
    const adminProfile = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        profile: {
          select: {
            id: true,
          },
        },
      },
    });

    await prisma.forum.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status === 'on',
        position: +data.position,
        moderator: {
          connect: {
            id: data.moderator,
          },
        },
        createdBy: {
          connect: {
            id: adminProfile.profile.id,
          },
        },
        parent: {
          connect: {
            id: data.parent,
          },
        },
        userPermissions: {
          create: {
            viewContent: !!data.viewContent_user,
            createTopic: !!data.createTopic,
            uploadFiles: !!data.uploadFiles,
            autoApproveTopic: !!data.autoApproveTopic,
            editTopic: !!data.editTopic,
            deleteTopic: !!data.deleteTopic,
            commentOnOpenTopic: !!data.commentOnOpenTopic,
            autoApproveComment: !!data.autoApproveComment,
            editComment: !!data.editComment,
            deleteComment: !!data.deleteComment,
          },
        },
        guestPermissions: {
          create: {
            viewContent: !!data.viewContent_guest,
          },
        },
      },
    });
    return redirect('/admin/forums');
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
