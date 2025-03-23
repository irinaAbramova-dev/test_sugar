-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "date_created" TIMESTAMPTZ(6),
    "author" UUID,
    "recipient" UUID,
    "text" TEXT,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "salt" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_author_foreign" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_recipient_foreign" FOREIGN KEY ("recipient") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
