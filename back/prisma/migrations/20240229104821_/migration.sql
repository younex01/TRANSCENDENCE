/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ChatGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChatGroup_name_key" ON "ChatGroup"("name");
