-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "creatorName" TEXT NOT NULL,
    "creatorPhone" TEXT NOT NULL,
    "creatorEmail" TEXT NOT NULL,
    "players" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "pricePerPerson" DOUBLE PRECISION,
    "accountType" TEXT,
    "accountNumber" TEXT,
    "additionalInfo" TEXT,
    "mapLink" TEXT,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "paymentReceiptUrl" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
