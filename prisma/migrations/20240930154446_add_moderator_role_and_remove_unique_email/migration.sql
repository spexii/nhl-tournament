-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MODERATOR';

-- DropIndex
DROP INDEX "User_email_key";
