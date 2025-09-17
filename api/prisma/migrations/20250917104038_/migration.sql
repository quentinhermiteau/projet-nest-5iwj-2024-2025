-- CreateEnum
CREATE TYPE "public"."TokenType" AS ENUM ('VALIDATION');

-- CreateTable
CREATE TABLE "public"."Token" (
    "id" TEXT NOT NULL,
    "type" "public"."TokenType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
