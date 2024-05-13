import { prisma } from './database.server';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import bcrypt from 'bcrypt';
import { validateUser } from './validate.server';

// eslint-disable-next-line no-undef
const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
  },
});

const createSession = async (id, redirectPath) => {
  const session = await sessionStorage.getSession();
  session.set('profileId', id);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
};

export const getUserFromSession = async (request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  const userId = session.get('profileId');

  if (!userId) {
    return null;
  }

  return userId;
};

export const requireUserSession = async (request) => {
  const profileId = getUserFromSession(request);

  if (!profileId) {
    throw redirect('/login');
  }
};

export const createUser = async (credentials) => {
  try {
    const exitingUser = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });

    const role = await prisma.role.findUnique({
      where: {
        title: credentials.role,
      },
    });

    const validationErrors = validateUser(credentials);

    if (!role) {
      const error = new Error('Role not found!');
      error.statusCode = 404;
      validationErrors.role = error.message;
    }

    if (exitingUser) {
      const error = new Error(
        'A user with the provided email has already exited.'
      );
      error.statusCode = 402;
      validationErrors.credential = error.message;
    }

    if (credentials.password !== credentials.confirmpassword) {
      const error = new Error('Passwords do not match.');
      error.statusCode = 404;
      validationErrors.confirmpassword = error.message;
    }

    if (Object.keys(validationErrors).length) {
      throw validationErrors;
    }

    const hashedPassword = await bcrypt.hash(credentials.password, 12);

    const user = await prisma.user.create({
      data: {
        email: credentials.email.toLowerCase(),
        password: hashedPassword,
        lastLoggedin: new Date(Date.now()),
        profile: {
          create: {
            name: credentials.username,
            status: true,
            isUserLive: true,
            roles: { connect: { id: role.id } },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return createSession(user.profile.id, '/');
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);

    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const loginUser = async (credentials) => {
  try {
    const exitingUser = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });

    if (!exitingUser) {
      const error = new Error('A user with the provided email has not exited.');
      error.statusCode = 404;
      throw error;
    }

    const passwordCheck = await bcrypt.compare(
      credentials.password,
      exitingUser.password
    );

    if (!passwordCheck) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    await prisma.user.update({
      where: {
        email: credentials.email,
      },
      data: {
        lastLoggedin: new Date(Date.now()),
        profile: {
          update: {
            isUserLive: true,
          },
        },
      },
    });

    return createSession(exitingUser.id, '/');
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

export const logoutUser = async (request, profileId) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  await prisma.profile.update({
    where: {
      id: profileId,
    },
    data: {
      isUserLive: false,
    },
  });

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};
