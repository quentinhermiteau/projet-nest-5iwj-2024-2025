-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('PENDING_VALIDATION', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'PENDING_VALIDATION';
