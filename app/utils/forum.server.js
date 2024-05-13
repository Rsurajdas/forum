import { redirect } from '@remix-run/react';
import { prisma } from './database.server';
import slugify from 'slugify';

export const createForum = async (data, profileId) => {
  try {
    const admin = await prisma.profile.findFirst({
      where: {
        id: profileId,
      },
    });

    const moderatorProfile = await prisma.profile.findFirst({
      where: {
        id: data.moderator,
      },
    });

    const moderatorRole = await prisma.role.findUnique({
      where: {
        title: 'Moderator',
      },
    });

    if (!moderatorProfile.roleId.includes(moderatorRole.id)) {
      await prisma.profile.update({
        where: {
          id: data.moderator,
        },
        data: {
          roles: { connect: { id: moderatorRole.id } },
        },
      });
    }

    const forum = await prisma.forum.create({
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
            id: admin.id,
          },
        },
        parent: {
          connect: {
            id: data.parent,
          },
        },
        permissions: {
          create: {
            viewContentGuest: !!data.viewContent_guest,
            viewContentUser: !!data.viewContent_user,
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
        slug: slugify(data.title, { lower: true }),
      },
    });

    await prisma.forumPermission.update({
      where: {
        id: forum.permissionId,
      },
      data: {
        forum: { connect: { id: forum.id } },
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
