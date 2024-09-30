import { Role as PrismaRole } from '@prisma/client';
import { Role as TypeScriptRole } from '@/types/user';

export const convertPrismaRoleToTypeScriptRole = (role: PrismaRole): TypeScriptRole => {
  switch (role) {
    case PrismaRole.USER:
      return TypeScriptRole.USER;
    case PrismaRole.MODERATOR:
      return TypeScriptRole.MODERATOR;
    case PrismaRole.ADMIN:
      return TypeScriptRole.ADMIN;
    default:
      throw new Error('Unknown role');
  }
};

export const isAdmin = (role: TypeScriptRole | undefined) => role === TypeScriptRole.ADMIN;