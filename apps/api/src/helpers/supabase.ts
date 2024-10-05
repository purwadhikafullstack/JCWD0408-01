import prisma from '@/prisma';
import { createLoginOAuth, createLoginToken } from './createToken';

export const LoginGoogleServices = async (
  email: string,
  avatar: string | null,
  first_name: string,
) => {
  try {
    let userData = await prisma.user.findFirst({
      where: {
        email,
        Provider: {
          some: {
            provider_name: 'GOOGLE',
          },
        },
      },
      include: {
        Provider: true,
      },
    });

    if (!userData) {
      userData = await prisma.user.create({
        data: {
          email,
          avatar,
          first_name,
          verified: true,
          role: 'buyer',
          Provider: {
            create: {
              provider_name: 'GOOGLE',
            },
          },
        },
        include: {
          Provider: true,
        },
      });
    }

    const payload = {
      id: userData?.user_id,
      role: userData?.role,
    };
    const token = createLoginToken({
      id: payload.id!,
      role: payload.role!,
    });

    return { userData, token };
  } catch (error) {
    throw error;
  }
};
