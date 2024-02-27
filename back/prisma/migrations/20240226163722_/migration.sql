-- CreateTable
CREATE TABLE "GameResult" (
    "id" SERIAL NOT NULL,
    "opponent_pic" TEXT NOT NULL,
    "score_player" INTEGER NOT NULL,
    "score_opponent" INTEGER NOT NULL,
    "result" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GameResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
