import argon2 from 'argon2';

const _secret = Buffer.from(process.env.MAIN_SECRET || 'localSecret');

export const hashPassword = async (password: string) => {
  const hash = await argon2.hash(password, { secret: _secret });
  return hash;
};

export const verifyPassword = async (hash: string, password: string) => {
  const valid = await argon2.verify(hash, password, { secret: _secret });
  return valid;
};
