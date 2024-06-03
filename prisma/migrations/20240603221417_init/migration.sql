-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profit_country" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "country" TEXT NOT NULL,
    "prefix" TEXT,
    "profit" INTEGER DEFAULT 0,

    CONSTRAINT "profit_country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
