import { prisma } from "./database.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcrypt";

// eslint-disable-next-line no-undef
const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
  },
});

const createSession = async (id, redirectPath) => {
  const session = await sessionStorage.getSession();
  session.set("userId", id);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const getUserFromSession = async (request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
};

export const requireUserSession = async (request) => {
  const userId = getUserFromSession(request);

  if (!userId) {
    throw redirect("/login");
  }
};

export const createUser = async (credentials) => {
  try {
    const exitingUser = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });

    if (exitingUser) {
      const error = new Error(
        "A user with the provided email has already exited."
      );
      error.statusCode = 422;
      throw error;
    }

    if (credentials.password !== credentials.confirmpassword) {
      const error = new Error("Passwords do not match.");
      error.statusCode = 401;
      throw error;
    }

    const hasedPassword = await bcrypt.hash(credentials.password, 12);

    const user = await prisma.user.create({
      data: {
        email: credentials.email.toLowerCase(),
        password: hasedPassword,
        lastLoggedin: new Date(Date.now()),
        profile: {
          create: {
            name: credentials.username,
            active: true,
            liveStatus: true,
          },
        },
      },
    });

    return createSession(user.id, "/");
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

export const loginUser = async (credentials) => {
  try {
    const exitingUser = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });

    if (!exitingUser) {
      const error = new Error("A user with the provided email has not exited.");
      error.statusCode = 404;
      throw error;
    }

    const passwordCheck = await bcrypt.compare(
      credentials.password,
      exitingUser.password
    );

    if (!passwordCheck) {
      const error = new Error("Invalid email or password");
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
            liveStatus: true,
          },
        },
      },
    });

    return createSession(exitingUser.id, "/");
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

export const logoutUser = async (request, userId) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profile: {
        update: {
          liveStatus: false,
        },
      },
    },
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
};
