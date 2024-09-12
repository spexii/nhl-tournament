import { Role as PrismaRole } from '@prisma/client';
import { Role as TypeScriptRole } from '@/types/userRoles';

export const convertPrismaRoleToTypeScriptRole = (role: PrismaRole): TypeScriptRole => {
  switch (role) {
    case PrismaRole.USER:
      return TypeScriptRole.USER;
    case PrismaRole.ADMIN:
      return TypeScriptRole.ADMIN;
    default:
      throw new Error('Unknown role');
  }
};

export const isAdmin = (role: TypeScriptRole) => role === TypeScriptRole.ADMIN;