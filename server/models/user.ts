import { PrismaClient } from '@prisma/client';
import argon2, { argon2id } from 'argon2';

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    }
  }
});

// Uses secret as pepper
const secret = Buffer.from(process.env.MAIN_SECRET || 'localSecret');

export const getUserCount = async () => await prisma.user.count();

export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (e) {
    throw new Error('User Not Found');
  }
};

export const getAllUsersByPage = async (size: number = 10, page : number = 1, take : number = 10) => {
  const skip = size * (page - 1);
  const userQuery = await prisma.user.findMany({
    skip,
    take,
  });
  return {
    result: userQuery,
    page,
    previous: page > 1 ? page - 1 : undefined,
    next: userQuery.length === take ? page + 1 : undefined,
  };
};

export const createUser = async (username: string, password: string) => {
  // Not using custom salt since is included in argon2
  const hash = await argon2.hash(password, { secret });
  const createdUser = await prisma.user.create({
    data: {
      username,
      password: hash,
    }
  })
  return createdUser;
};

export const validateUserPassword = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      password: true,
    }
  });
  if (!user) throw new Error('User Not Found');
  const result = await argon2.verify(user.password, password, { secret });
  if (!result) throw new Error('Password Invalid');
  return result;
};
